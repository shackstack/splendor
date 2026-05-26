import { getGemCount } from '../game/logic/gems';
import type { GemCounts, RegularGemType } from '../types/gems';

export function canAddGemToBasket(
  basket: RegularGemType[],
  gem: RegularGemType,
  bank: GemCounts,
): boolean {
  if (getGemCount(bank, gem) === 0) return false;
  if (basket.length >= 3) return false;

  if (basket.length === 2 && basket[0] === basket[1]) {
    return false;
  }

  const inBasket = basket.filter((g) => g === gem).length;

  if (basket.length === 1 && basket[0] === gem) {
    return getGemCount(bank, gem) >= 4;
  }

  if (inBasket >= 1) return false;

  return true;
}

export const GEM_DRAG_TYPE = 'application/x-splendor-gem';
