import { create } from 'zustand';

import type { BoardSource, CardSource, DeckSource } from '../types/action';
import type { RegularGemType } from '../types/gems';

export type CardSelection = BoardSource | DeckSource | { kind: 'reserved'; index: number };

interface UiStore {
  selectedGems: RegularGemType[];
  selectedCard: CardSelection | null;
  toggleGem: (gem: RegularGemType) => void;
  clearGems: () => void;
  selectCard: (source: CardSelection | null) => void;
  reset: () => void;
}

export const useUiStore = create<UiStore>((set) => ({
  selectedGems: [],
  selectedCard: null,

  toggleGem: (gem) => {
    set((store) => {
      const index = store.selectedGems.indexOf(gem);
      if (index >= 0) {
        return { selectedGems: store.selectedGems.filter((_, i) => i !== index) };
      }
      if (store.selectedGems.length >= 3) {
        return store;
      }
      return { selectedGems: [...store.selectedGems, gem] };
    });
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
