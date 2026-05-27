import { create } from 'zustand';

import { canAddGemToBasket } from '../utils/gemBasket';
import type { BoardSource, CardSource, DeckSource } from '../types/action';
import type { GemCounts, RegularGemType } from '../types/gems';
import type { PlayerState } from '../types/player';

export type CardSelection = BoardSource | DeckSource | { kind: 'reserved'; index: number };

interface UiStore {
  selectedGems: RegularGemType[];
  selectedCard: CardSelection | null;
  detailPlayer: PlayerState | null;
  addGemToBasket: (gem: RegularGemType, bank: GemCounts) => void;
  removeGemFromBasket: (index: number) => void;
  clearGems: () => void;
  selectCard: (source: CardSelection | null) => void;
  openDetailModal: (player: PlayerState) => void;
  closeDetailModal: () => void;
  reset: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  selectedGems: [],
  selectedCard: null,
  detailPlayer: null,

  addGemToBasket: (gem, bank) => {
    set((store) => {
      if (!canAddGemToBasket(store.selectedGems, gem, bank)) {
        return store;
      }
      return { selectedGems: [...store.selectedGems, gem] };
    });
  },

  removeGemFromBasket: (index) => {
    set((store) => ({
      selectedGems: store.selectedGems.filter((_, i) => i !== index),
    }));
  },

  clearGems: () => set({ selectedGems: [] }),

  selectCard: (source) => set({ selectedCard: source }),

  openDetailModal:  (player) => set({ detailPlayer: player }),
  closeDetailModal: ()       => set({ detailPlayer: null }),

  reset: () => set({ selectedGems: [], selectedCard: null }),
}));

export function toCardSource(selection: CardSelection): CardSource | null {
  if (selection.kind === 'deck') {
    return null;
  }
  return selection;
}
