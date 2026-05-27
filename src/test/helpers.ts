import { cloneGameState, clonePlayer } from '../game/logic/clone';
import { initGame } from '../game/logic/setup';
import type { Card, GameState, GemCounts, PlayerState } from '../types';

export function makeTestCard(overrides: Partial<Card> = {}): Card {
  return {
    id: 'test-card-1',
    level: 1,
    cost: { baekok: 1 },
    points: 0,
    bonus: 'heugyoseok',
    ...overrides,
  };
}

export function makePlayer(overrides: Partial<PlayerState> = {}): PlayerState {
  return {
    id: 'player-0',
    name: 'Player',
    isBot: false,
    gems: {},
    purchasedCards: [],
    reservedCards: [],
    nobles: [],
    score: 0,
    ...overrides,
  };
}

export function makeTestState(options: {
  human?: Partial<PlayerState>;
  bot?: Partial<PlayerState>;
  boardCard?: Card | null;
  gemBank?: GemCounts;
  decks?: GameState['decks'];
} = {}): GameState {
  const base = cloneGameState(initGame(2));
  const human = makePlayer({
    ...clonePlayer(base.players[0]),
    ...options.human,
  });
  const bot = makePlayer({
    ...clonePlayer(base.players[1]),
    isBot: true,
    botLevel: 'greedy',
    name: 'Bot 1',
    id: 'player-1',
    ...options.bot,
  });

  const boardCard = options.boardCard === undefined ? makeTestCard() : options.boardCard;

  return {
    ...base,
    currentPlayerIndex: 0,
    turnNumber: 1,
    players: [human, bot],
    gemBank: options.gemBank ?? base.gemBank,
    decks: options.decks ?? base.decks,
    board: {
      ...base.board,
      1: [{ card: boardCard }, ...base.board[1].slice(1)],
    },
  };
}

export function getTotalGemsInGame(state: GameState): number {
  const bankTotal = Object.values(state.gemBank).reduce((sum, count) => sum + (count ?? 0), 0);
  const playerTotal = state.players.reduce(
    (sum, player) =>
      sum + Object.values(player.gems).reduce((playerSum, count) => playerSum + (count ?? 0), 0),
    0,
  );
  return bankTotal + playerTotal;
}
