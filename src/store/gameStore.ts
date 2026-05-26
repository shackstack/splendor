import { create } from 'zustand';

import { botAction } from '../bot';
import { applyAction, checkNobleVisit, checkWinCondition, initGame } from '../game/logic';
import type { Action, BotLevel, GameState } from '../types';

interface GameStore {
  state: GameState | null;
  startGame: (botLevel: BotLevel) => void;
  playerAction: (action: Action) => void;
  reset: () => void;
}

function withBotLevel(state: GameState, botLevel: BotLevel): GameState {
  return {
    ...state,
    players: state.players.map((player) =>
      player.isBot ? { ...player, botLevel } : player,
    ),
  };
}

function processAction(state: GameState, action: Action): GameState {
  const actingPlayerId = state.players[state.currentPlayerIndex].id;
  const nextState = applyAction(state, action);

  checkNobleVisit(nextState, actingPlayerId);
  checkWinCondition(nextState);

  return nextState;
}

function runBotTurns(state: GameState): GameState {
  let current = state;

  while (current.phase !== 'finished') {
    const currentPlayer = current.players[current.currentPlayerIndex];
    if (!currentPlayer.isBot) {
      break;
    }

    const action = botAction(
      current,
      currentPlayer.id,
      currentPlayer.botLevel ?? 'greedy',
    );
    current = processAction(current, action);
  }

  return current;
}

export const useGameStore = create<GameStore>((set) => ({
  state: null,

  startGame: (botLevel) => {
    set({ state: withBotLevel(initGame(2), botLevel) });
  },

  playerAction: (action) => {
    set((store) => {
      if (!store.state || store.state.phase === 'finished') {
        return store;
      }

      const currentPlayer = store.state.players[store.state.currentPlayerIndex];
      if (currentPlayer.isBot) {
        return store;
      }

      const nextState = runBotTurns(processAction(store.state, action));
      return { state: nextState };
    });
  },

  reset: () => {
    set({ state: null });
  },
}));
