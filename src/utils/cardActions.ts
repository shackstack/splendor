import { getValidActions } from '../game/logic';
import type { CardSelection } from '../store/uiStore';
import type { Action, GameState } from '../types';

export function findReserveAction(
  actions: Action[],
  selectedCard: CardSelection,
): Action | null {
  if (selectedCard.kind === 'deck') {
    return (
      actions.find(
        (a) =>
          a.type === 'reserve_card' &&
          a.source.kind === 'deck' &&
          a.source.level === selectedCard.level,
      ) ?? null
    );
  }

  if (selectedCard.kind === 'board') {
    return (
      actions.find(
        (a) =>
          a.type === 'reserve_card' &&
          a.source.kind === 'board' &&
          a.source.level === selectedCard.level &&
          a.source.slotIndex === selectedCard.slotIndex,
      ) ?? null
    );
  }

  return null;
}

export function findPurchaseAction(
  actions: Action[],
  selectedCard: CardSelection,
): Action | null {
  if (selectedCard.kind === 'board') {
    return (
      actions.find(
        (a) =>
          a.type === 'purchase_card' &&
          a.source.kind === 'board' &&
          a.source.level === selectedCard.level &&
          a.source.slotIndex === selectedCard.slotIndex,
      ) ?? null
    );
  }

  if (selectedCard.kind === 'reserved') {
    return (
      actions.find(
        (a) =>
          a.type === 'purchase_card' &&
          a.source.kind === 'reserved' &&
          a.source.index === selectedCard.index,
      ) ?? null
    );
  }

  return null;
}

export function getCardActions(
  state: GameState,
  playerId: string,
  selection: CardSelection,
): { reserveAction: Action | null; purchaseAction: Action | null } {
  const validActions = getValidActions(state, playerId);
  return {
    reserveAction: findReserveAction(validActions, selection),
    purchaseAction: findPurchaseAction(validActions, selection),
  };
}
