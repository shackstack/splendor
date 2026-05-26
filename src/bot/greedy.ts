import { buildMinimumPayment } from '../game/logic/player';
import type { Action, Card, GameState, PlayerState, PurchaseCardAction, ReserveCardAction } from '../types/index';
import {
  compareCards,
  getBoardCards,
  getCardFromPurchaseAction,
  getCardFromReserveAction,
} from './card';
import { isOneTurnAway, scoreGemAction } from './evaluation';
import { randomBotAction } from './random';
import { getPlayer, pickRandom } from './utils';

function pickBestPurchase(state: GameState, player: PlayerState, actions: PurchaseCardAction[]): PurchaseCardAction {
  return [...actions].sort((a, b) => {
    const cardA = getCardFromPurchaseAction(state, player, a);
    const cardB = getCardFromPurchaseAction(state, player, b);
    if (!cardA || !cardB) return 0;
    return compareCards(cardA, cardB);
  })[0];
}

function pickBestReserve(state: GameState, player: PlayerState, actions: ReserveCardAction[]): ReserveCardAction | null {
  const candidates = actions
    .map((action) => ({ action, card: getCardFromReserveAction(state, action) }))
    .filter((entry): entry is { action: ReserveCardAction; card: Card } =>
      entry.card !== null && isOneTurnAway(state, player, entry.card),
    )
    .sort((a, b) => compareCards(a.card, b.card));

  return candidates[0]?.action ?? null;
}

function pickTargetCard(state: GameState, player: PlayerState): Card | null {
  const unaffordable = getBoardCards(state)
    .map(({ card }) => card)
    .filter((card) => !buildMinimumPayment(player, card))
    .sort(compareCards);

  return unaffordable[0] ?? null;
}

function pickGemAction(player: PlayerState, target: Card, actions: Action[]): Action {
  const gemActions = actions.filter(
    (action) => action.type === 'take_three_gems' || action.type === 'take_two_gems',
  );
  if (gemActions.length === 0) {
    throw new Error('No gem actions available');
  }

  const scored = gemActions
    .map((action) => ({ action, score: scoreGemAction(player, target, action) }))
    .sort((a, b) => b.score - a.score);

  const bestScore = scored[0].score;
  const best = scored.filter((entry) => entry.score === bestScore).map((entry) => entry.action);
  return pickRandom(best);
}

export function greedyBotAction(state: GameState, playerId: string, actions: Action[]): Action {
  const player = getPlayer(state, playerId);

  const purchases = actions.filter((action): action is PurchaseCardAction => action.type === 'purchase_card');
  if (purchases.length > 0) {
    return pickBestPurchase(state, player, purchases);
  }

  const reserves = actions.filter((action): action is ReserveCardAction => action.type === 'reserve_card');
  const bestReserve = pickBestReserve(state, player, reserves);
  if (bestReserve) {
    return bestReserve;
  }

  const target = pickTargetCard(state, player);
  if (target) {
    return pickGemAction(player, target, actions);
  }

  return randomBotAction(actions);
}
