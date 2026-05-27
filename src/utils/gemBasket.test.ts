import { describe, expect, it } from 'vitest';

import type { GemCounts } from '../types/gems';
import { canAddGemToBasket } from './gemBasket';

describe('canAddGemToBasket', () => {
  const bank: GemCounts = {
    baekok: 4,
    heugyoseok: 2,
    bijae: 1,
    hongok: 0,
    hwangok: 3,
  };

  it('allows two of the same gem when bank has at least 4', () => {
    expect(canAddGemToBasket([], 'baekok', bank)).toBe(true);
    expect(canAddGemToBasket(['baekok'], 'baekok', bank)).toBe(true);
  });

  it('rejects a third gem after selecting two of the same color', () => {
    expect(canAddGemToBasket(['baekok', 'baekok'], 'heugyoseok', bank)).toBe(false);
  });

  it('rejects duplicate colors in a three-gem selection', () => {
    expect(canAddGemToBasket(['baekok'], 'baekok', bank)).toBe(true);
    expect(canAddGemToBasket(['baekok', 'heugyoseok'], 'baekok', bank)).toBe(false);
  });
});
