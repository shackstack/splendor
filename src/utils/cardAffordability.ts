import { buildMinimumPayment } from '../game/logic/player';
import type { Card } from '../types/card';
import type { PlayerState } from '../types/player';

export function canAffordCard(player: PlayerState, card: Card): boolean {
  return buildMinimumPayment(player, card) !== null;
}
