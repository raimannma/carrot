import { lossType, MSELoss } from "../methods/Loss";
import { FixedRate, Rate } from "../methods/Rate";

/**
 * Options used to train network
 */
export class TrainOptions {
  /**
   * A [learning rate policy](https://towardsdatascience.com/understanding-learning-rates-and-how-it-improves-performance-in-deep-learning-d0d4059c1c10), i.e. how to change the learning rate during training to better network performance
   */
  public rate: Rate;
  /**
   * The [options.loss function](https://en.wikipedia.org/wiki/Loss_function) used to determine network error
   */
  public loss: lossType;
  /**
   * A data of input values and ideal output values to train the network with
   */
  public dataset: {
    /**
     * The input values
     */
    input: number[];
    /**
     * The target output values
     */
    output: number[];
  }[];
  /**
   * If set to true, will shuffle the training data every iterationNumber. Good option to use if the network is performing worse in [cross validation](https://artint.info/html/ArtInt_189.html) than in the real training data.
   */
  public shuffle: boolean;
  /**
   * If set to true, will clear the network after every activation. This is useful for training LSTM's, more importantly for time series prediction.
   */
  public clear: boolean;
  /**
   * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
   */
  public schedule?: {
    /**
     * You can schedule tasks to happen every n iterations. Paired with `options.schedule.function`
     */
    iterations: number;
    /**
     * A function to run every n iterations as data by `options.schedule.iterations`. Passed as an object with a "function" property that contains the function to run.
     *
     * @param error the current network error
     * @param iteration the current iteration count
     */
    function: (error: number, iteration: number) => undefined;
  };
  /**
   * Sets the amount of test cases that should be assigned to cross validation. If data to 0.4, 40% of the given data will be used for cross validation.
   */
  public crossValidateTestSize: number;
  /**
   * Sets amount of training cycles the process will maximally run, even when the target error has not been reached.
   */
  public iterations: number;
  /**
   * The target error to train for, once the network falls below this error, the process is stopped. Lower error rates require more training cycles.
   */
  public error: number;
  /**
   * [Momentum](https://www.willamette.edu/~gorr/classes/cs449/momrate.html). Adds a fraction of the previous weight update to the current one.
   */
  public momentum: number;
  /**
   * [Dropout rate](https://medium.com/@amarbudhiraja/https-medium-com-amarbudhiraja-learning-less-to-learn-better-options.dropout-in-deep-machine-learning-74334da4bfc5) likelihood for any given neuron to be ignored during network training. Must be between zero and one, numbers closer to one will result in more neurons ignored.
   */
  public dropout: number;
  /**
   * If set to n, outputs training status every n iterations. Setting `log` to 1 will log the status every iteration_number
   */
  public log: number;
  /**
   * Sets the (mini-) batch size of your training. Default: 1 [(online training)](https://www.quora.com/What-is-the-difference-between-batch-online-and-mini-batch-training-in-neural-networks-Which-one-should-I-use-for-a-small-to-medium-sized-dataset-for-prediction-purposes)
   */
  public batchSize: number;

  constructor(
    dataset: {
      /**
       * The input values
       */
      input: number[];
      /**
       * The target output values
       */
      output: number[];
    }[]
  ) {
    this.dataset = dataset;
    this.iterations = -1;
    this.error = -1;
    this.loss = MSELoss;
    this.dropout = 0;
    this.momentum = 0;
    this.batchSize = this.dataset.length;
    this.rate = new FixedRate(0.3);
    this.log = -1;
    this.crossValidateTestSize = -1;
    this.shuffle = false;
    this.clear = false;
  }
}
