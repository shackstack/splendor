import { getValidActions } from '../game/logic';
import { addGemCounts } from '../game/logic/gems';
import { buildMinimumPayment, getBonusCounts, getNetGemCost } from '../game/logic/player';
import type { Action, Card, GameState, GemCounts, PlayerState } from '../types/index';

export function gemsFromTakeAction(action: Action): GemCounts {
  if (action.type === 'take_three_gems') {
    const gems: GemCounts = {};
    for (const gem of action.gems) {
      gems[gem] = (gems[gem] ?? 0) + 1;
    }
    return gems;
  }
  if (action.type === 'take_two_gems') {
    return { [action.gem]: 2 };
  }
  return {};
}

export function canBuyWithGems(player: PlayerState, card: Card, gems: GemCounts): boolean {
  return buildMinimumPayment({ ...player, gems }, card) !== null;
}

export function isOneTurnAway(state: GameState, player: PlayerState, card: Card): boolean {
  if (buildMinimumPayment(player, card)) return false;

  const gemActions = getValidActions(state, player.id).filter(
    (action) => action.type === 'take_three_gems' || action.type === 'take_two_gems',
  );

  return gemActions.some((action) => {
    const nextGems = addGemCounts(player.gems, gemsFromTakeAction(action));
    return canBuyWithGems(player, card, nextGems);
  });
}

export function scoreGemAction(player: PlayerState, target: Card, action: Action): number {
  const netCost = getNetGemCost(target, getBonusCounts(player));
  if (action.type === 'take_three_gems') {
    return action.gems.reduce((score, gem) => score + ((netCost[gem] ?? 0) > 0 ? 1 : 0), 0);
  }
  if (action.type === 'take_two_gems') {
    return (netCost[action.gem] ?? 0) > 0 ? 2 : 0;
  }
  return 0;
}
