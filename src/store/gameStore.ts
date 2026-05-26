import { create } from 'zustand';

import { applyAction, initGame } from '../game/logic';
import type { Action, GameState } from '../types';

interface GameStore {
  state: GameState | null;
  startGame: (playerCount?: number) => void;
  dispatch: (action: Action) => void;
  reset: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  state: null,

  startGame: (playerCount = 2) => {
    set({ state: initGame(playerCount) });
  },

  dispatch: (action) => {
    set((store) => {
      if (!store.state) {
        return store;
      }

      return { state: applyAction(store.state, action) };
    });
  },

  reset: () => {
    set({ state: null });
  },
}));
