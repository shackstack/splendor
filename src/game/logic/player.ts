import type { Card, GemCounts, PlayerState, RegularGemCounts } from '../../types/index';
import { GEM_TYPES, REGULAR_GEM_TYPES } from '../../types/index';
import { getGemCount } from './gems';

export function createPlayers(playerCount: number): PlayerState[] {
  return Array.from({ length: playerCount }, (_, index) => ({
    id: `player-${index}`,
    name: index === 0 ? 'Player' : `Bot ${index}`,
    isBot: index !== 0,
    botLevel: index === 0 ? undefined : ('greedy' as const),
    gems: {},
    purchasedCards: [],
    reservedCards: [],
    nobles: [],
    score: 0,
  }));
}

export function getBonusCounts(player: PlayerState): RegularGemCounts {
  const bonuses: RegularGemCounts = {};
  for (const card of player.purchasedCards) {
    bonuses[card.bonus] = (bonuses[card.bonus] ?? 0) + 1;
  }
  return bonuses;
}

export function getNetGemCost(card: Card, bonuses: RegularGemCounts): RegularGemCounts {
  const netCost: RegularGemCounts = {};
  for (const gem of REGULAR_GEM_TYPES) {
    const required = Math.max(0, (card.cost[gem] ?? 0) - (bonuses[gem] ?? 0));
    if (required > 0) {
      netCost[gem] = required;
    }
  }
  return netCost;
}

export function buildMinimumPayment(player: PlayerState, card: Card): GemCounts | null {
  const netCost = getNetGemCost(card, getBonusCounts(player));
  const payment: GemCounts = {};
  let goldNeeded = 0;

  for (const gem of REGULAR_GEM_TYPES) {
    const need = netCost[gem] ?? 0;
    if (need === 0) continue;

    const available = getGemCount(player.gems, gem);
    const use = Math.min(available, need);
    if (use > 0) {
      payment[gem] = use;
    }
    goldNeeded += need - use;
  }

  if (goldNeeded > getGemCount(player.gems, 'gold')) {
    return null;
  }

  if (goldNeeded > 0) {
    payment.gold = goldNeeded;
  }

  return payment;
}

export function isValidPayment(player: PlayerState, card: Card, payment: GemCounts): boolean {
  const netCost = getNetGemCost(card, getBonusCounts(player));

  for (const gem of GEM_TYPES) {
    if (getGemCount(payment, gem) > getGemCount(player.gems, gem)) {
      return false;
    }
  }

  let goldUsed = getGemCount(payment, 'gold');
  for (const gem of REGULAR_GEM_TYPES) {
    const need = netCost[gem] ?? 0;
    const paid = getGemCount(payment, gem);
    if (paid > need) return false;
    goldUsed -= need - paid;
  }

  return goldUsed === 0;
}
