import { Mutation, Network, randDouble, Selection } from "..";
import { Population } from "./Population";
import { ActivationType } from "activations/build/src";

export class InstinctPopulation extends Population {
  constructor(
    populationSize: number,
    options: {
      template?: Network | undefined;
      inputSize?: number;
      outputSize?: number;
    }
  ) {
    super(populationSize, options);
  }

  protected breed(selection: Selection, elitists: number): void {
    if (elitists > this.populationSize) throw new RangeError("Can`t evolve! Elitism exceeds population size!");

    let newPopulation: Network[] = [];
    for (let i = 0; i < elitists; i++) {
      newPopulation.push(this.networks[i]);
    }

    while (newPopulation.length < this.populationSize) {
      let parent1 = selection.select(this.networks);
      let parent2 = selection.select(this.networks);
      newPopulation.push(Network.crossover(parent1, parent2));
    }
    this.networks = newPopulation;
  }

  protected mutate(
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
  ): void {
    for (let i = options.elitists ?? 0; i < this.networks.length; i++) {
      if (randDouble() <= mutationRate) {
        for (let j = 0; j < mutationAmount; j++) {
          this.networks[i].mutateRandom(mutations, options);
        }
      }
    }
  }
}
