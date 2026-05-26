import { create } from 'zustand';

import { canAddGemToBasket } from '../utils/gemBasket';
import type { BoardSource, CardSource, DeckSource } from '../types/action';
import type { GemCounts, RegularGemType } from '../types/gems';

export type CardSelection = BoardSource | DeckSource | { kind: 'reserved'; index: number };

interface UiStore {
  selectedGems: RegularGemType[];
  selectedCard: CardSelection | null;
  addGemToBasket: (gem: RegularGemType, bank: GemCounts) => void;
  removeGemFromBasket: (index: number) => void;
  clearGems: () => void;
  selectCard: (source: CardSelection | null) => void;
  reset: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  selectedGems: [],
  selectedCard: null,

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

  reset: () => set({ selectedGems: [], selectedCard: null }),
}));

export function toCardSource(selection: CardSelection): CardSource | null {
  if (selection.kind === 'deck') {
    return null;
  }
  return selection;
}
