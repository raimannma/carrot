import { NEATPopulation, pickRandom, Selection } from "..";
import { Network } from "./Network";

/**
 * A class holding a species
 */
export class Species {
  /**
   * The representative network of this species
   * @private
   */
  public representative: Network;

  /**
   * The member networks in this species
   * @private
   */
  public readonly members: Set<Network>;
  /**
   * The score of this species
   * @private
   */
  public score: number;
  highScore: number;

  stagnation: number;
  bestNetwork: Network;
  private avgScore: number;

  constructor(representative: Network) {
    this.representative = representative;

    this.members = new Set<Network>();
    this.members.add(representative);
    this.highScore = -Infinity;
    this.score = 0;
    this.avgScore = 0;
    this.stagnation = 0;
    this.bestNetwork = representative.deepCopy();
  }

  isCompatible(network: Network) {
    return (
      network.distance(this.representative, NEATPopulation.c1, NEATPopulation.c2, NEATPopulation.c3) <
      NEATPopulation.distanceThreshold
    );
  }

  /**
   * Puts a network to the species without checking the distance
   * @param network
   */
  public put(network: Network): void {
    this.members.add(network);
  }

  /**
   * Update the score of this species and updating the best network.
   */
  public updateScore(representativeIsBest: boolean = true): void {
    this.fitnessSharing();
    this.sumScores();

    // Get the score of the best member
    let max: number = -Infinity;
    let bestNetwork: Network = this.representative;
    this.members.forEach((network) => {
      if (network.score && network.score > max) {
        max = network.score;
        bestNetwork = network;
      }
    });

    // check if the high score changed
    if (max > this.highScore) {
      // new high score -> save best network and reset stagnation
      this.highScore = max;
      this.bestNetwork = bestNetwork.deepCopy();
      this.stagnation = 0;

      this.representative = representativeIsBest ? bestNetwork : pickRandom(this.members);
    } else {
      // if not increase stagnation value
      this.stagnation++;
    }
  }

  sumScores(): void {
    this.members.forEach((network) => {
      if (network.score) this.score += network.score;
      else throw new ReferenceError("Network needs score for fitness evaluation!");
    });
  }

  public getSumAdjustedScores(): number {
    let sum: number = 0;
    this.members.forEach((network) => {
      if (network.score) sum += network.adjustedFitness;
      else throw new ReferenceError("Network needs score for fitness evaluation!");
    });
    return sum;
  }
  public getAvgAdjustedScore(): number {
    return this.getSumAdjustedScores() / this.members.size;
  }

  setAverage(): void {
    this.avgScore = this.score / this.members.size;
  }

  /**
   * Reset this object
   */
  public reset(): void {
    this.representative = pickRandom(this.members);
    this.members.clear();
    this.members.add(this.representative);
    this.score = 0;
  }

  /**
   * Kill a specific percentage of networks
   * @param percentage the kill rate
   * @param representativeIsBest is representative always the best member?
   */
  public cull(percentage: number = 0.5, representativeIsBest: boolean = true): void {
    const arr: Network[] = this.sortedNetworksArray(); // descending

    const amount: number = Math.floor(percentage * this.members.size);
    for (let i: number = amount; i < arr.length; i++) {
      this.members.delete(arr[i]);
    }

    if (!representativeIsBest) this.representative = pickRandom(this.members);
  }

  /**
   * Create offspring
   */
  public breed(selection: Selection): Network {
    let sortedMembers = this.sortedNetworksArray();
    return Network.crossover(selection.select(sortedMembers), selection.select(sortedMembers));
  }

  /**
   * The size of this species
   */
  public size(): number {
    return this.members.size;
  }

  /**
   * to string
   */
  public toString(): String {
    return "Species={Members: " + this.members.size + "; Score: " + this.score + "}";
  }

  public sortedNetworksArray(): Network[] {
    return Array.from(this.members).sort((a: Network, b: Network) => {
      if (a.score && b.score) return b.score - a.score;
      else if (a.score) return -1;
      else if (b.score) return 1;
      else return 0;
    });
  }

  fitnessSharing(): void {
    this.members.forEach((network) => {
      if (network.score) network.adjustedFitness = network.score / this.members.size;
      else throw new ReferenceError("Network needs score for fitness sharing!");
    });
  }
}
