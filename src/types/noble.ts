import type { RegularGemCounts } from './gems';

export interface Noble {
  id: string;
  requirements: RegularGemCounts;
  points: number;
}
