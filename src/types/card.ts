import type { RegularGemCounts, RegularGemType } from './gems';

export type CardLevel = 1 | 2 | 3;

export interface Card {
  id: string;
  level: CardLevel;
  cost: RegularGemCounts;
  points: number;
  bonus: RegularGemType;
}

export interface BoardSlot {
  card: Card | null;
}
