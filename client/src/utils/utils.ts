import { Survivor } from "../api";

export interface SurvivorRow extends Survivor {
  reportedCount: number;
}

export function createItemDeltaDict(
  senderAmounts: Record<string, number>,
  receiverAmounts: Record<string, number>,
) {
  const keys = new Set([
    ...Object.keys(senderAmounts),
    ...Object.keys(receiverAmounts),
  ]);

  return [...keys].reduce(
    (acc, key) => {
      acc[key] = (receiverAmounts[key] || 0) - (senderAmounts[key] || 0);
      return acc;
    },
    {} as Record<string, number>,
  );
}

export const PRICE_TABLE = {
  Water: 4,
  Food: 3,
  Medication: 2,
  Ammunition: 1,
} as Record<string, number>;
