import type { Action, Card, GameState, GemCounts, PlayerState } from '../../types/index';
import { WINNING_SCORE } from '../../types/index';
import { drawCard, getBoardCard, refillBoardSlot } from './board';
import { cloneCard, cloneGameState, clonePlayer } from './clone';
import { addGemCounts, getGemCount, subtractGemCounts } from './gems';
import { assignNobleIfEligible } from './noble';
import { isValidPayment } from './player';
import {
  getCurrentPlayer,
  isActiveTurn,
  resolveCardFromSource,
  updatePlayerAtIndex,
} from './state-access';
import { advanceTurn } from './win';
import { getValidActions } from './valid-actions';

function finalizeTurn(state: GameState, actorIndex: number): GameState {
  let nextState = assignNobleIfEligible(state, actorIndex);
  const actor = nextState.players[actorIndex];

  if (actor.score >= WINNING_SCORE && !nextState.finalRoundTriggeredBy) {
    nextState = {
      ...nextState,
      finalRoundTriggeredBy: actor.id,
    };
  }

  return advanceTurn(nextState, actorIndex);
}

function applyTakeThreeGems(state: GameState, action: Extract<Action, { type: 'take_three_gems' }>): GameState {
  const actorIndex = state.currentPlayerIndex;
  const actor = clonePlayer(state.players[actorIndex]);
  const gemsTaken: GemCounts = {};

  for (const gem of action.gems) {
    gemsTaken[gem] = (gemsTaken[gem] ?? 0) + 1;
  }

  const nextPlayer: PlayerState = {
    ...actor,
    gems: addGemCounts(actor.gems, gemsTaken),
  };

  let nextState = updatePlayerAtIndex(state, actorIndex, nextPlayer);
  nextState = {
    ...nextState,
    gemBank: subtractGemCounts(nextState.gemBank, gemsTaken),
  };

  return finalizeTurn(nextState, actorIndex);
}

function applyTakeTwoGems(state: GameState, action: Extract<Action, { type: 'take_two_gems' }>): GameState {
  const actorIndex = state.currentPlayerIndex;
  const actor = clonePlayer(state.players[actorIndex]);
  const gemsTaken: GemCounts = { [action.gem]: 2 };

  const nextPlayer: PlayerState = {
    ...actor,
    gems: addGemCounts(actor.gems, gemsTaken),
  };

  let nextState = updatePlayerAtIndex(state, actorIndex, nextPlayer);
  nextState = {
    ...nextState,
    gemBank: subtractGemCounts(nextState.gemBank, gemsTaken),
  };

  return finalizeTurn(nextState, actorIndex);
}

function applyReserveCard(state: GameState, action: Extract<Action, { type: 'reserve_card' }>): GameState {
  const actorIndex = state.currentPlayerIndex;
  const actor = clonePlayer(state.players[actorIndex]);
  let nextState = cloneGameState(state);
  let reservedCard: Card;

  if (action.source.kind === 'board') {
    const card = getBoardCard(nextState, action.source);
    if (!card) return state;

    reservedCard = cloneCard(card);
    nextState = {
      ...nextState,
      board: {
        ...nextState.board,
        [action.source.level]: nextState.board[action.source.level].map((slot, index) =>
          index === action.source.slotIndex ? { card: null } : slot,
        ),
      },
    };
    nextState = refillBoardSlot(nextState, action.source.level, action.source.slotIndex);
  } else {
    const drawn = drawCard(nextState.decks, action.source.level);
    if (!drawn.card) return state;

    reservedCard = drawn.card;
    nextState = { ...nextState, decks: drawn.decks };
  }

  const goldGrant = getGemCount(nextState.gemBank, 'giok') > 0 ? { giok: 1 } : {};
  const nextPlayer: PlayerState = {
    ...actor,
    reservedCards: [...actor.reservedCards, reservedCard],
    gems: addGemCounts(actor.gems, goldGrant),
  };

  nextState = updatePlayerAtIndex(nextState, actorIndex, nextPlayer);
  if (goldGrant.giok) {
    nextState = {
      ...nextState,
      gemBank: subtractGemCounts(nextState.gemBank, goldGrant),
    };
  }

  return finalizeTurn(nextState, actorIndex);
}

function applyPurchaseCard(state: GameState, action: Extract<Action, { type: 'purchase_card' }>): GameState {
  const actorIndex = state.currentPlayerIndex;
  const actor = clonePlayer(state.players[actorIndex]);
  const card = resolveCardFromSource(state, actor, action.source);
  if (!card || !isValidPayment(actor, card, action.payment)) {
    return state;
  }

  let nextState = cloneGameState(state);

  if (action.source.kind === 'board') {
    nextState = {
      ...nextState,
      board: {
        ...nextState.board,
        [action.source.level]: nextState.board[action.source.level].map((slot, index) =>
          index === action.source.slotIndex ? { card: null } : slot,
        ),
      },
    };
    nextState = refillBoardSlot(nextState, action.source.level, action.source.slotIndex);
  } else {
    nextState = {
      ...nextState,
      players: nextState.players.map((player, index) =>
        index === actorIndex
          ? {
              ...clonePlayer(player),
              reservedCards: player.reservedCards.filter((_, reservedIndex) => reservedIndex !== action.source.index),
            }
          : clonePlayer(player),
      ),
    };
  }

  const purchasedCard = cloneCard(card);
  const nextPlayerBase = nextState.players[actorIndex];
  const nextPlayer: PlayerState = {
    ...clonePlayer(nextPlayerBase),
    gems: subtractGemCounts(nextPlayerBase.gems, action.payment),
    purchasedCards: [...nextPlayerBase.purchasedCards.map(cloneCard), purchasedCard],
    score: nextPlayerBase.score + purchasedCard.points,
  };

  nextState = updatePlayerAtIndex(nextState, actorIndex, nextPlayer);
  nextState = {
    ...nextState,
    gemBank: addGemCounts(nextState.gemBank, action.payment),
  };

  return finalizeTurn(nextState, actorIndex);
}

export function applyAction(state: GameState, action: Action): GameState {
  if (state.phase === 'finished' || !isActiveTurn(state, getCurrentPlayer(state).id)) {
    return cloneGameState(state);
  }

  const validActions = getValidActions(state, getCurrentPlayer(state).id);
  const isValid = validActions.some((candidate) => JSON.stringify(candidate) === JSON.stringify(action));
  if (!isValid) {
    return cloneGameState(state);
  }

  switch (action.type) {
    case 'take_three_gems':
      return applyTakeThreeGems(cloneGameState(state), action);
    case 'take_two_gems':
      return applyTakeTwoGems(cloneGameState(state), action);
    case 'reserve_card':
      return applyReserveCard(cloneGameState(state), action);
    case 'purchase_card':
      return applyPurchaseCard(cloneGameState(state), action);
    default:
      return cloneGameState(state);
  }
}
// 단위 테스트:
// take_three_gems 후 bank/player gem count 합 일정
// purchase_card 후 purchasedCards 증가, board 슬롯 리필
// 15점 도달 후 finalRoundTriggeredBy 설정
// final round 종료 후 phase === 'finished', winnerIds 설정
