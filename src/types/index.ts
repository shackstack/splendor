/** 다이아몬드, 사파이어, 에메랄드, 루비, 오닉스 (보너스/비용/귀족 요구에 사용) */
export type RegularGemType =
  | 'diamond'
  | 'sapphire'
  | 'emerald'
  | 'ruby'
  | 'onyx';

/** RegularGemType + 골드(와일드). 골드는 보너스가 아니며 비용 할인에만 사용 */
export type GemType = RegularGemType | 'gold';

/** 보석 개수 맵 (0이면 키 생략 가능) */
export type GemCounts = Partial<Record<GemType, number>>;

/** 일반 보석만 (뱅크·3종 가져가기 등 골드 제외 컨텍스트) */
export type RegularGemCounts = Partial<Record<RegularGemType, number>>;

export const REGULAR_GEM_TYPES = [
  'diamond',
  'sapphire',
  'emerald',
  'ruby',
  'onyx',
] as const satisfies readonly RegularGemType[];

export const GEM_TYPES = [...REGULAR_GEM_TYPES, 'gold'] as const satisfies readonly GemType[];

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

export interface Noble {
  id: string;
  requirements: RegularGemCounts;
  points: number;
}

export type BotLevel = 'random' | 'greedy' | 'strategic';

export interface PlayerState {
  id: string;
  name: string;
  isBot: boolean;
  botLevel?: BotLevel;

  gems: GemCounts;
  purchasedCards: Card[];
  reservedCards: Card[];
  nobles: Noble[];

  score: number;
}

export type GamePhase = 'playing' | 'final_round' | 'finished';

export interface GameState {
  players: PlayerState[];
  currentPlayerIndex: number;

  gemBank: GemCounts;
  nobles: Noble[];

  board: Record<CardLevel, BoardSlot[]>;
  decks: Record<CardLevel, Card[]>;

  phase: GamePhase;
  finalRoundTriggeredBy?: string;
  winnerIds?: string[];

  turnNumber: number;
}

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

export const MAX_GEMS_IN_HAND = 10;
export const MAX_RESERVED_CARDS = 3;
export const WINNING_SCORE = 15;
export const BOARD_SLOTS_PER_LEVEL = 4;
export const MIN_PLAYERS = 2;
export const MAX_PLAYERS = 4;
