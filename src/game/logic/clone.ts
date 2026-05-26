import type { Card, GameState, GemCounts, Noble, PlayerState } from '../../types/index';

export function cloneGemCounts(gems: GemCounts): GemCounts {
  return { ...gems };
}

export function cloneCard(card: Card): Card {
  return { ...card, cost: { ...card.cost } };
}

export function cloneNoble(noble: Noble): Noble {
  return { ...noble, requirements: { ...noble.requirements } };
}

export function clonePlayer(player: PlayerState): PlayerState {
  return {
    ...player,
    gems: cloneGemCounts(player.gems),
    purchasedCards: player.purchasedCards.map(cloneCard),
    reservedCards: player.reservedCards.map(cloneCard),
    nobles: player.nobles.map(cloneNoble),
  };
}

export function cloneGameState(state: GameState): GameState {
  return {
    ...state,
    players: state.players.map(clonePlayer),
    gemBank: cloneGemCounts(state.gemBank),
    nobles: state.nobles.map(cloneNoble),
    board: {
      1: state.board[1].map((slot) => ({ card: slot.card ? cloneCard(slot.card) : null })),
      2: state.board[2].map((slot) => ({ card: slot.card ? cloneCard(slot.card) : null })),
      3: state.board[3].map((slot) => ({ card: slot.card ? cloneCard(slot.card) : null })),
    },
    decks: {
      1: state.decks[1].map(cloneCard),
      2: state.decks[2].map(cloneCard),
      3: state.decks[3].map(cloneCard),
    },
    winnerIds: state.winnerIds ? [...state.winnerIds] : undefined,
  };
}
