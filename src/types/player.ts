import type { Card } from './card';
import type { GemCounts } from './gems';
import type { Noble } from './noble';

export type BotLevel = 'random' | 'greedy' | 'strategic';

export interface PlayerState {
  id: string;
  name: string;
  isBot: boolean;
  botLevel?: BotLevel;

  gems: GemCounts;
  purchasedCards: Card[];
  reservedCards: Card[];
  nobles: Noble[];

  score: number;
}
