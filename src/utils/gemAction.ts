import type { Action } from '../types';
import type { RegularGemType } from '../types/gems';

export function buildGemActionFromSelection(selectedGems: RegularGemType[]): Action | null {
  if (selectedGems.length === 0) return null;

  const unique = new Set(selectedGems);
  if (unique.size !== selectedGems.length) {
    if (selectedGems.length === 2 && selectedGems[0] === selectedGems[1]) {
      return { type: 'take_two_gems', gem: selectedGems[0] };
    }
    return null;
  }

  if (selectedGems.length > 3) return null;

  return { type: 'take_three_gems', gems: selectedGems };
}

export function getIncomingGemCount(action: Action): number {
  return action.type === 'take_two_gems' ? 2 : action.gems.length;
}
