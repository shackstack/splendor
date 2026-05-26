import { CARD_LEVELS } from '../game/logic/constants';
import type { Card, CardLevel, GameState, PlayerState, PurchaseCardAction, ReserveCardAction } from '../types/index';

export function compareCards(a: Card, b: Card): number {
  if (b.points !== a.points) return b.points - a.points;
  return b.level - a.level;
}

export function getBoardCards(state: GameState): Array<{ card: Card; level: CardLevel; slotIndex: number }> {
  const cards: Array<{ card: Card; level: CardLevel; slotIndex: number }> = [];
  for (const level of CARD_LEVELS) {
    state.board[level].forEach((slot, slotIndex) => {
      if (slot.card) {
        cards.push({ card: slot.card, level, slotIndex });
      }
    });
  }
  return cards;
}

export function getCardFromPurchaseAction(
  state: GameState,
  player: PlayerState,
  action: PurchaseCardAction,
): Card | null {
  if (action.source.kind === 'reserved') {
    return player.reservedCards[action.source.index] ?? null;
  }
  return state.board[action.source.level][action.source.slotIndex]?.card ?? null;
}

export function getCardFromReserveAction(state: GameState, action: ReserveCardAction): Card | null {
  if (action.source.kind === 'board') {
    return state.board[action.source.level][action.source.slotIndex]?.card ?? null;
  }
  return null;
}
