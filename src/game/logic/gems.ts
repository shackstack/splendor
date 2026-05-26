import type { GemCounts, GemType } from '../../types/index';
import { GEM_TYPES } from '../../types/index';
import { cloneGemCounts } from './clone';

export function getGemCount(gems: GemCounts, gem: GemType): number {
  return gems[gem] ?? 0;
}

export function getTotalGemCount(gems: GemCounts): number {
  return GEM_TYPES.reduce((sum, gem) => sum + getGemCount(gems, gem), 0);
}

export function addGemCounts(base: GemCounts, delta: GemCounts): GemCounts {
  const result = cloneGemCounts(base);
  for (const gem of GEM_TYPES) {
    const next = getGemCount(result, gem) + getGemCount(delta, gem);
    if (next > 0) {
      result[gem] = next;
    } else {
      delete result[gem];
    }
  }
  return result;
}

export function subtractGemCounts(base: GemCounts, delta: GemCounts): GemCounts {
  const result = cloneGemCounts(base);
  for (const gem of GEM_TYPES) {
    const next = getGemCount(result, gem) - getGemCount(delta, gem);
    if (next > 0) {
      result[gem] = next;
    } else {
      delete result[gem];
    }
  }
  return result;
}

export function getGemBankSize(playerCount: number): number {
  if (playerCount === 2) return 4;
  if (playerCount === 3) return 5;
  return 7;
}
