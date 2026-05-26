import { CARDS_BY_LEVEL } from '../../data/cards';
import type { Card, CardLevel, GameState, GemCounts } from '../../types/index';
import { MAX_PLAYERS, MIN_PLAYERS, REGULAR_GEM_TYPES } from '../../types/index';
import { fillBoard } from './board';
import { cloneCard } from './clone';
import { getGemBankSize } from './gems';
import { pickNobles } from './noble';
import { createPlayers } from './player';
import { shuffle } from './utils';

function createInitialGemBank(playerCount: number): GemCounts {
  const perColor = getGemBankSize(playerCount);
  const bank: GemCounts = { gold: 5 };
  for (const gem of REGULAR_GEM_TYPES) {
    bank[gem] = perColor;
  }
  return bank;
}

function createDecks(): Record<CardLevel, Card[]> {
  return {
    1: shuffle(CARDS_BY_LEVEL[1]).map(cloneCard),
    2: shuffle(CARDS_BY_LEVEL[2]).map(cloneCard),
    3: shuffle(CARDS_BY_LEVEL[3]).map(cloneCard),
  };
}

export function initGame(playerCount: number): GameState {
  if (playerCount < MIN_PLAYERS || playerCount > MAX_PLAYERS) {
    throw new Error(`playerCount must be between ${MIN_PLAYERS} and ${MAX_PLAYERS}`);
  }

  const decks = createDecks();
  const { board, decks: remainingDecks } = fillBoard(decks);

  return {
    players: createPlayers(playerCount),
    currentPlayerIndex: 0,
    gemBank: createInitialGemBank(playerCount),
    nobles: pickNobles(playerCount),
    board,
    decks: remainingDecks,
    phase: 'playing',
    turnNumber: 1,
  };
}
// 단위 테스트:
// initGame(2) -> players.length === 2, phase === 'playing', nobles.length === 3
// initGame(4) -> gemBank.diamond === 7, board[1].length === 4
// initGame(1) -> Error
