import * as TimSort from "timsort";
import {NEAT} from "../NEAT";
import {maxValueIndex, pickRandom} from "../utils/Utils";
import {Network} from "./Network";

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
     * The score of this species
     * @private
     */
    public score: number;
    /**
     * The member networks in this species
     * @private
     */
    public readonly members: Set<Network>;

    constructor(representative: Network) {
        this.representative = representative;
        this.representative.species = this;

        this.members = new Set<Network>();
        this.members.add(representative);

        this.score = 0;
    }

    /**
     * Puts a network to the species, after checking the distance
     * @param network
     */
    public put(network: Network): boolean {
        if (network.distance(this.representative) < NEAT.SPECIES_DISTANCE_THRESHOLD) {
            this.forcePut(network);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Puts a network to the species without checking the distance
     * @param network
     */
    public forcePut(network: Network): void {
        if (network === undefined) {
            return;
        }
        this.members.add(network);
        network.species = this;
    }

    /**
     * Calculate the score of this species
     */
    public evaluateScore(): void {
        let sum: number = 0;
        this.members.forEach(network => sum += network.score ?? 0);
        this.score = sum / this.members.size;
    }

    /**
     * Reset this object
     */
    public reset(): void {
        this.representative = pickRandom(this.members);
        this.members.forEach(genome => genome.species = null);
        this.members.clear();
        this.members.add(this.representative);
        this.representative.species = this;
        this.score = 0;
    }

    /**
     * Kill a specific percantage of networks
     * @param percentage
     */
    public kill(percentage: number): void {
        const arr: Network[] = Array.from(this.members);
        TimSort.sort(arr, (a: Network, b: Network) => {
            return a.score === undefined || b.score === undefined ? 0 : a.score - b.score;
        });

        const amount: number = Math.floor(percentage * this.members.size);
        for (let i: number = 0; i < amount; i++) {
            this.members.delete(arr[i]);
            arr[i].species = null;
        }
    }

    /**
     * Create offspring
     */
    public breed(): Network {
        return Network.crossOver(pickRandom(this.members), pickRandom(this.members));
    }

    /**
     * The size of this species
     */
    public size(): number {
        return this.members.size;
    }

    public getBest(): Network {
        const networks: Network[] = Array.from(this.members);
        return networks[maxValueIndex(networks.map(genome => genome.score ?? -Infinity))];
    }
}
