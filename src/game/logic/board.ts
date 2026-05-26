import type { BoardSource, Card, CardLevel, GameState } from '../../types/index';
import { BOARD_SLOTS_PER_LEVEL } from '../../types/index';
import { cloneCard } from './clone';
import { CARD_LEVELS } from './constants';

export function drawCard(decks: Record<CardLevel, Card[]>, level: CardLevel): {
  card: Card | null;
  decks: Record<CardLevel, Card[]>;
} {
  const deck = [...decks[level]];
  if (deck.length === 0) {
    return { card: null, decks: { ...decks, [level]: deck } };
  }
  const [card, ...rest] = deck;
  return {
    card: cloneCard(card),
    decks: { ...decks, [level]: rest },
  };
}

export function fillBoard(decks: Record<CardLevel, Card[]>): {
  board: GameState['board'];
  decks: Record<CardLevel, Card[]>;
} {
  let nextDecks = decks;
  const board: GameState['board'] = { 1: [], 2: [], 3: [] };

  for (const level of CARD_LEVELS) {
    const slots = Array.from({ length: BOARD_SLOTS_PER_LEVEL }, () => ({ card: null as Card | null }));
    for (let slotIndex = 0; slotIndex < BOARD_SLOTS_PER_LEVEL; slotIndex += 1) {
      const drawn = drawCard(nextDecks, level);
      nextDecks = drawn.decks;
      slots[slotIndex] = { card: drawn.card };
    }
    board[level] = slots;
  }

  return { board, decks: nextDecks };
}

export function getBoardCard(state: GameState, source: BoardSource): Card | null {
  return state.board[source.level][source.slotIndex]?.card ?? null;
}

export function refillBoardSlot(state: GameState, level: CardLevel, slotIndex: number): GameState {
  const drawn = drawCard(state.decks, level);
  const nextBoard = {
    ...state.board,
    [level]: state.board[level].map((slot, index) =>
      index === slotIndex ? { card: drawn.card } : { card: slot.card ? cloneCard(slot.card) : null },
    ),
  };

  return {
    ...state,
    board: nextBoard,
    decks: drawn.decks,
  };
}
