import type { CardLevel } from './card';
import type { GemCounts, RegularGemType } from './gems';

export type BoardSource = {
  kind: 'board';
  level: CardLevel;
  slotIndex: number;
};

export type DeckSource = {
  kind: 'deck';
  level: CardLevel;
};

export type ReservedSource = {
  kind: 'reserved';
  index: number;
};

export type CardSource = BoardSource | ReservedSource;

export interface TakeThreeGemsAction {
  type: 'take_three_gems';
  gems: RegularGemType[];
}

export interface TakeTwoGemsAction {
  type: 'take_two_gems';
  gem: RegularGemType;
}

export interface ReserveCardAction {
  type: 'reserve_card';
  source: BoardSource | DeckSource;
}

export interface PurchaseCardAction {
  type: 'purchase_card';
  source: CardSource;
  payment: GemCounts;
}

export type Action =
  | TakeThreeGemsAction
  | TakeTwoGemsAction
  | ReserveCardAction
  | PurchaseCardAction;
