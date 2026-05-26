import type { BoardSlot, Card, CardLevel } from './card';
import type { GemCounts } from './gems';
import type { Noble } from './noble';
import type { PlayerState } from './player';

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
