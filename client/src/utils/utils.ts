import { Survivor } from "../api";

export interface SurvivorRow extends Survivor {
  reportedCount: number;
}