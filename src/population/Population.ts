import { EvolveOptions, Mutation, Network, Selection } from "..";
import { lossType } from "../methods/Loss";
import { datasetType, fitnessFunction } from "../enums/types";
import { ActivationType } from "activations/build/src";

export abstract class Population {
  protected readonly populationSize: number;
  protected networks: Network[];
  protected generation: number;

  protected constructor(
    populationSize: number,
    options: {
      template?: Network | undefined;
      inputSize?: number;
      outputSize?: number;
    }
  ) {
    this.populationSize = populationSize;

    // Create Networks
    this.networks = this.createNetworks(
      options.template,
      options.inputSize,
      options.outputSize
    );

    // Initialize variables
    this.generation = 0;
  }

  public evolve(options: EvolveOptions): Network {
    this.calculateScores(
      options.fitnessFunction,
      options.dataset,
      options.loss
    );
    while (this.generation < options.iterations) {
      this.breed(options.selection, options.elitism);
      this.sortNetworks();
      this.mutate(
        options.mutations,
        options.mutationRate,
        options.mutationAmount,
        {
          elitists: options.elitism,
          maxNodes: options.maxNodes,
          maxConnections: options.maxConnections,
          maxGates: options.maxGates,
          activations: options.activations,
        }
      );
      this.calculateScores(
        options.fitnessFunction,
        options.dataset,
        options.loss
      );
      this.generation++;
      this.log();

      this.networks.forEach((network) => (network.score = undefined));
    }

    return this.getBest();
  }

  public getBest(): Network {
    this.sortNetworks();
    return this.networks[0];
  }

  protected sortNetworks(): void {
    this.networks = Array.from(this.networks).sort((a: Network, b: Network) => {
      if (a.score && b.score) return b.score - a.score;
      else if (a.score) return -1;
      else if (b.score) return 1;
      else return 0;
    });
  }

  protected abstract breed(selection: Selection, elitism: number): void;

  protected abstract mutate(
    mutations: Mutation[],
    mutationRate: number,
    mutationAmount: number,
    options: {
      elitists?: number;
      maxNodes?: number;
      maxConnections?: number;
      maxGates?: number;
      activations?: ActivationType[];
    }
  ): void;

  protected createNetworks(
    template?: Network,
    inputSize?: number,
    outputSize?: number
  ): Network[] {
    let networks = [];
    for (let i = 0; i < this.populationSize; i++) {
      if (template) networks.push(template.deepCopy());
      else if (inputSize && outputSize)
        networks.push(new Network(inputSize, outputSize));
      else
        throw new Error(
          "You must provide either a template network or input and output size!"
        );
    }
    return networks;
  }

  protected log() {
    console.log(
      "Generation: " + this.generation + "; Error: " + this.getBest().score
    );
  }

  protected calculateScores(
    fitnessFunction?: fitnessFunction,
    dataset?: datasetType,
    loss?: lossType
  ): void {
    if (fitnessFunction) {
      fitnessFunction(this.networks, dataset);
    } else if (dataset) {
      for (let network of this.networks) {
        network.score = -network.test(dataset, loss);
      }
    } else {
      let hasScores: boolean = true;
      this.networks.forEach((network) => {
        if (!network.score) hasScores = false;
      });
      if (!hasScores)
        throw new Error(
          "If network scores aren't set, you have to specify a fitness function or a dataset!"
        );
    }
  }
}
