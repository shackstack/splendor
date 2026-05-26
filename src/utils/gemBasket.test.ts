import { describe, expect, it } from 'vitest';

import type { GemCounts } from '../types/gems';
import { canAddGemToBasket } from './gemBasket';

describe('canAddGemToBasket', () => {
  const bank: GemCounts = {
    diamond: 4,
    sapphire: 2,
    emerald: 1,
    ruby: 0,
    onyx: 3,
  };

  it('allows two of the same gem when bank has at least 4', () => {
    expect(canAddGemToBasket([], 'diamond', bank)).toBe(true);
    expect(canAddGemToBasket(['diamond'], 'diamond', bank)).toBe(true);
  });

  it('rejects a third gem after selecting two of the same color', () => {
    expect(canAddGemToBasket(['diamond', 'diamond'], 'sapphire', bank)).toBe(false);
  });

  it('rejects duplicate colors in a three-gem selection', () => {
    expect(canAddGemToBasket(['diamond'], 'diamond', bank)).toBe(true);
    expect(canAddGemToBasket(['diamond', 'sapphire'], 'diamond', bank)).toBe(false);
  });
});
