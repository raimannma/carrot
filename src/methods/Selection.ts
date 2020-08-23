/**
 * Genetic Algorithm Selection Methods (Genetic Operator)
 *
 * @see [Genetic Algorithm - Selection]{@link https://en.wikipedia.org/wiki/Selection_(genetic_algorithm)}
 */
import { Network, pickRandom, randDouble } from "..";

abstract class Selection {
  /**
   * Selects a genome from the population according to the Selection method.
   *
   * @param population the pool of networks
   * @returns the selected genome
   */
  public abstract select(population: Network[]): Network;
}

/**
 * Fitness proportionate selection
 *
 * [Fitness Proportionate / Roulette Wheel Selection on Wikipedia](https://en.wikipedia.org/wiki/Fitness_proportionate_selection)
 */
class FitnessProportionateSelection extends Selection {
  /**
   * Selects a genome from the population according to the Selection method.
   *
   * @param population the pool of networks
   * @returns the selected genome
   */
  public select(population: Network[]): Network {
    let totalFitness = 0;
    let minimalFitness = 0;
    for (const genome of population) {
      minimalFitness = Math.min(genome.score ?? minimalFitness, minimalFitness);
      totalFitness += genome.score ?? 0;
    }

    minimalFitness = Math.abs(minimalFitness);
    totalFitness += minimalFitness * population.length;

    const random: number = randDouble(0, totalFitness);
    let value = 0;

    for (const genome of population) {
      value += (genome.score ?? 0) + minimalFitness;
      if (random < value) {
        return genome;
      }
    }

    return pickRandom(population);
  }
}

/**
 * Power selection
 *
 * A random decimal value between 0 and 1 will be generated (e.g. 0.5) then this value will get an exponential value (power, default is 4). So 0.5**4 = 0.0625. This is converted into an index for the array of the current population, sorted from fittest to worst.
 */
class PowerSelection extends Selection {
  /**
   * Probability of picking better networks.
   */
  public readonly power: number;

  /**
   * Constructs a power selection.
   * @param power Probability of picking better networks.
   */
  constructor(power = 4) {
    super();
    this.power = power;
  }

  /**
   * Selects a genome from the population according to the Selection method.
   *
   * @param population the pool of networks
   * @returns the selected genome
   */
  public select(population: Network[]): Network {
    return population[Math.floor(Math.random() ** this.power * population.length)];
  }
}

/**
 * Tournament selection
 *
 * [Tournament Selection on Wikipedia](https://en.wikipedia.org/wiki/Tournament_selection)
 */
class TournamentSelection extends Selection {
  /**
   * The size of a tournament.
   */
  public readonly size: number;
  /**
   * The probability of just picking the best network.
   */
  public readonly probability: number;

  /**
   * Constructs a tournament selection.
   * @param size the size of a tournament
   * @param probability Selects the best individual (when probability = 1).
   */
  constructor(size = 5, probability = 0.5) {
    super();
    this.size = size;
    this.probability = probability;
  }

  /**
   * Selects a genome from the population according to the Selection method.
   *
   * @param population the pool of networks
   * @returns the selected genome
   */
  public select(population: Network[]): Network {
    if (this.size > population.length) {
      throw new Error(
        "Your tournament size should be lower than the population size, please change methods.selection.TOURNAMENT.size"
      );
    }

    // Create a tournament
    const individuals: Network[] = [];
    for (let i = 0; i < this.size; i++) {
      individuals.push(pickRandom(population));
    }

    // Sort the tournament individuals by score
    individuals.sort((a, b) => {
      if (a.score && b.score) return b.score - a.score;
      else if (a.score) return -1;
      else if (b.score) return 1;
      else return 0;
    });

    // Select an individual
    for (let i = 0; i < this.size; i++) {
      if (Math.random() < this.probability || i === this.size - 1) {
        return individuals[i];
      }
    }
    return pickRandom(population);
  }
}

export { Selection, FitnessProportionateSelection, PowerSelection, TournamentSelection };
