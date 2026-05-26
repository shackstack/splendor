import type {
  Card,
  CardLevel,
  RegularGemCounts,
  RegularGemType,
} from '../types/index';

type RawCard = {
  bonus: RegularGemType;
  points: number;
  cost: RegularGemCounts;
};

function buildCards(level: CardLevel, defs: RawCard[]): Card[] {
  const counters: Partial<Record<RegularGemType, number>> = {};

  return defs.map(({ bonus, points, cost }) => {
    counters[bonus] = (counters[bonus] ?? 0) + 1;
    const index = String(counters[bonus]).padStart(2, '0');

    return {
      id: `l${level}-${bonus}-${index}`,
      level,
      bonus,
      points,
      cost,
    };
  });
}

const RAW_LEVEL_1_CARDS: RawCard[] = [
  { bonus: 'onyx', points: 0, cost: { sapphire: 1, emerald: 1, ruby: 1, diamond: 1 } }, // l1-onyx-01
  { bonus: 'onyx', points: 0, cost: { sapphire: 2, emerald: 1, ruby: 1, diamond: 1 } }, // l1-onyx-02
  { bonus: 'onyx', points: 0, cost: { sapphire: 2, ruby: 1, diamond: 2 } }, // l1-onyx-03
  { bonus: 'onyx', points: 0, cost: { onyx: 1, emerald: 1, ruby: 3 } }, // l1-onyx-04
  { bonus: 'onyx', points: 0, cost: { emerald: 2, ruby: 1 } }, // l1-onyx-05
  { bonus: 'onyx', points: 0, cost: { emerald: 2, diamond: 2 } }, // l1-onyx-06
  { bonus: 'onyx', points: 0, cost: { emerald: 3 } }, // l1-onyx-07
  { bonus: 'onyx', points: 1, cost: { sapphire: 4 } }, // l1-onyx-08
  { bonus: 'sapphire', points: 0, cost: { onyx: 1, emerald: 1, ruby: 1, diamond: 1 } }, // l1-sapphire-01
  { bonus: 'sapphire', points: 0, cost: { onyx: 1, emerald: 1, ruby: 2, diamond: 1 } }, // l1-sapphire-02
  { bonus: 'sapphire', points: 0, cost: { emerald: 2, ruby: 2, diamond: 1 } }, // l1-sapphire-03
  { bonus: 'sapphire', points: 0, cost: { sapphire: 1, emerald: 3, ruby: 1 } }, // l1-sapphire-04
  { bonus: 'sapphire', points: 0, cost: { onyx: 2, diamond: 1 } }, // l1-sapphire-05
  { bonus: 'sapphire', points: 0, cost: { onyx: 2, emerald: 2 } }, // l1-sapphire-06
  { bonus: 'sapphire', points: 0, cost: { onyx: 3 } }, // l1-sapphire-07
  { bonus: 'sapphire', points: 1, cost: { ruby: 4 } }, // l1-sapphire-08
  { bonus: 'diamond', points: 0, cost: { onyx: 1, sapphire: 1, emerald: 1, ruby: 1 } }, // l1-diamond-01
  { bonus: 'diamond', points: 0, cost: { onyx: 1, sapphire: 1, emerald: 2, ruby: 1 } }, // l1-diamond-02
  { bonus: 'diamond', points: 0, cost: { onyx: 1, sapphire: 2, emerald: 2 } }, // l1-diamond-03
  { bonus: 'diamond', points: 0, cost: { onyx: 1, sapphire: 1, diamond: 3 } }, // l1-diamond-04
  { bonus: 'diamond', points: 0, cost: { onyx: 1, ruby: 2 } }, // l1-diamond-05
  { bonus: 'diamond', points: 0, cost: { onyx: 2, sapphire: 2 } }, // l1-diamond-06
  { bonus: 'diamond', points: 0, cost: { sapphire: 3 } }, // l1-diamond-07
  { bonus: 'diamond', points: 1, cost: { emerald: 4 } }, // l1-diamond-08
  { bonus: 'emerald', points: 0, cost: { onyx: 1, sapphire: 1, ruby: 1, diamond: 1 } }, // l1-emerald-01
  { bonus: 'emerald', points: 0, cost: { onyx: 2, sapphire: 1, ruby: 1, diamond: 1 } }, // l1-emerald-02
  { bonus: 'emerald', points: 0, cost: { onyx: 2, sapphire: 1, ruby: 2 } }, // l1-emerald-03
  { bonus: 'emerald', points: 0, cost: { sapphire: 3, emerald: 1, diamond: 1 } }, // l1-emerald-04
  { bonus: 'emerald', points: 0, cost: { sapphire: 1, diamond: 2 } }, // l1-emerald-05
  { bonus: 'emerald', points: 0, cost: { sapphire: 2, ruby: 2 } }, // l1-emerald-06
  { bonus: 'emerald', points: 0, cost: { ruby: 3 } }, // l1-emerald-07
  { bonus: 'emerald', points: 1, cost: { onyx: 4 } }, // l1-emerald-08
  { bonus: 'ruby', points: 0, cost: { onyx: 1, sapphire: 1, emerald: 1, diamond: 1 } }, // l1-ruby-01
  { bonus: 'ruby', points: 0, cost: { onyx: 1, sapphire: 1, emerald: 1, diamond: 2 } }, // l1-ruby-02
  { bonus: 'ruby', points: 0, cost: { onyx: 2, emerald: 1, diamond: 2 } }, // l1-ruby-03
  { bonus: 'ruby', points: 0, cost: { onyx: 3, ruby: 1, diamond: 1 } }, // l1-ruby-04
  { bonus: 'ruby', points: 0, cost: { sapphire: 2, emerald: 1 } }, // l1-ruby-05
  { bonus: 'ruby', points: 0, cost: { ruby: 2, diamond: 2 } }, // l1-ruby-06
  { bonus: 'ruby', points: 0, cost: { diamond: 3 } }, // l1-ruby-07
  { bonus: 'ruby', points: 1, cost: { diamond: 4 } }, // l1-ruby-08
];

export const LEVEL_1_CARDS = buildCards(1, RAW_LEVEL_1_CARDS);

const RAW_LEVEL_2_CARDS: RawCard[] = [
  { bonus: 'onyx', points: 1, cost: { sapphire: 2, emerald: 2, diamond: 3 } }, // l2-onyx-01
  { bonus: 'onyx', points: 1, cost: { onyx: 2, emerald: 3, diamond: 3 } }, // l2-onyx-02
  { bonus: 'onyx', points: 2, cost: { sapphire: 1, emerald: 4, ruby: 2 } }, // l2-onyx-03
  { bonus: 'onyx', points: 2, cost: { emerald: 5, ruby: 3 } }, // l2-onyx-04
  { bonus: 'onyx', points: 2, cost: { diamond: 5 } }, // l2-onyx-05
  { bonus: 'onyx', points: 3, cost: { onyx: 6 } }, // l2-onyx-06
  { bonus: 'sapphire', points: 1, cost: { sapphire: 2, emerald: 2, ruby: 3 } }, // l2-sapphire-01
  { bonus: 'sapphire', points: 1, cost: { onyx: 3, sapphire: 2, emerald: 3 } }, // l2-sapphire-02
  { bonus: 'sapphire', points: 2, cost: { sapphire: 3, diamond: 5 } }, // l2-sapphire-03
  { bonus: 'sapphire', points: 2, cost: { onyx: 4, ruby: 1, diamond: 2 } }, // l2-sapphire-04
  { bonus: 'sapphire', points: 2, cost: { sapphire: 5 } }, // l2-sapphire-05
  { bonus: 'sapphire', points: 3, cost: { sapphire: 6 } }, // l2-sapphire-06
  { bonus: 'diamond', points: 1, cost: { onyx: 2, emerald: 3, ruby: 2 } }, // l2-diamond-01
  { bonus: 'diamond', points: 1, cost: { sapphire: 3, ruby: 3, diamond: 2 } }, // l2-diamond-02
  { bonus: 'diamond', points: 2, cost: { onyx: 2, emerald: 1, ruby: 4 } }, // l2-diamond-03
  { bonus: 'diamond', points: 2, cost: { onyx: 3, ruby: 5 } }, // l2-diamond-04
  { bonus: 'diamond', points: 2, cost: { ruby: 5 } }, // l2-diamond-05
  { bonus: 'diamond', points: 3, cost: { diamond: 6 } }, // l2-diamond-06
  { bonus: 'emerald', points: 1, cost: { emerald: 2, ruby: 3, diamond: 3 } }, // l2-emerald-01
  { bonus: 'emerald', points: 1, cost: { onyx: 2, sapphire: 3, diamond: 2 } }, // l2-emerald-02
  { bonus: 'emerald', points: 2, cost: { onyx: 1, sapphire: 2, diamond: 4 } }, // l2-emerald-03
  { bonus: 'emerald', points: 2, cost: { sapphire: 5, emerald: 3 } }, // l2-emerald-04
  { bonus: 'emerald', points: 2, cost: { emerald: 5 } }, // l2-emerald-05
  { bonus: 'emerald', points: 3, cost: { emerald: 6 } }, // l2-emerald-06
  { bonus: 'ruby', points: 1, cost: { onyx: 3, ruby: 2, diamond: 2 } }, // l2-ruby-01
  { bonus: 'ruby', points: 1, cost: { onyx: 3, sapphire: 3, ruby: 2 } }, // l2-ruby-02
  { bonus: 'ruby', points: 2, cost: { sapphire: 4, emerald: 2, diamond: 1 } }, // l2-ruby-03
  { bonus: 'ruby', points: 2, cost: { onyx: 5, diamond: 3 } }, // l2-ruby-04
  { bonus: 'ruby', points: 2, cost: { onyx: 5 } }, // l2-ruby-05
  { bonus: 'ruby', points: 3, cost: { ruby: 6 } }, // l2-ruby-06
];

export const LEVEL_2_CARDS = buildCards(2, RAW_LEVEL_2_CARDS);

const RAW_LEVEL_3_CARDS: RawCard[] = [
  { bonus: 'onyx', points: 3, cost: { sapphire: 3, emerald: 5, ruby: 3, diamond: 3 } }, // l3-onyx-01
  { bonus: 'onyx', points: 4, cost: { ruby: 7 } }, // l3-onyx-02
  { bonus: 'onyx', points: 4, cost: { onyx: 3, emerald: 3, ruby: 6 } }, // l3-onyx-03
  { bonus: 'onyx', points: 5, cost: { onyx: 3, ruby: 7 } }, // l3-onyx-04
  { bonus: 'sapphire', points: 3, cost: { onyx: 5, emerald: 3, ruby: 3, diamond: 3 } }, // l3-sapphire-01
  { bonus: 'sapphire', points: 4, cost: { diamond: 7 } }, // l3-sapphire-02
  { bonus: 'sapphire', points: 4, cost: { onyx: 3, sapphire: 3, diamond: 6 } }, // l3-sapphire-03
  { bonus: 'sapphire', points: 5, cost: { sapphire: 3, diamond: 7 } }, // l3-sapphire-04
  { bonus: 'diamond', points: 3, cost: { onyx: 3, sapphire: 3, emerald: 3, ruby: 5 } }, // l3-diamond-01
  { bonus: 'diamond', points: 4, cost: { onyx: 7 } }, // l3-diamond-02
  { bonus: 'diamond', points: 4, cost: { onyx: 6, ruby: 3, diamond: 3 } }, // l3-diamond-03
  { bonus: 'diamond', points: 5, cost: { onyx: 7, diamond: 3 } }, // l3-diamond-04
  { bonus: 'emerald', points: 3, cost: { onyx: 3, sapphire: 3, ruby: 3, diamond: 5 } }, // l3-emerald-01
  { bonus: 'emerald', points: 4, cost: { sapphire: 7 } }, // l3-emerald-02
  { bonus: 'emerald', points: 4, cost: { sapphire: 6, emerald: 3, diamond: 3 } }, // l3-emerald-03
  { bonus: 'emerald', points: 5, cost: { sapphire: 7, emerald: 3 } }, // l3-emerald-04
  { bonus: 'ruby', points: 3, cost: { onyx: 3, sapphire: 5, emerald: 3, diamond: 3 } }, // l3-ruby-01
  { bonus: 'ruby', points: 4, cost: { emerald: 7 } }, // l3-ruby-02
  { bonus: 'ruby', points: 4, cost: { sapphire: 3, emerald: 6, ruby: 3 } }, // l3-ruby-03
  { bonus: 'ruby', points: 5, cost: { emerald: 7, ruby: 3 } }, // l3-ruby-04
];

export const LEVEL_3_CARDS = buildCards(3, RAW_LEVEL_3_CARDS);

export const CARDS_BY_LEVEL: Record<CardLevel, Card[]> = {
  1: LEVEL_1_CARDS,
  2: LEVEL_2_CARDS,
  3: LEVEL_3_CARDS,
};

export const ALL_CARDS: Card[] = [
  ...LEVEL_1_CARDS,
  ...LEVEL_2_CARDS,
  ...LEVEL_3_CARDS,
];

if (LEVEL_1_CARDS.length !== 40) {
  throw new Error(`Expected 40 level 1 cards, got ${LEVEL_1_CARDS.length}`);
}
if (LEVEL_2_CARDS.length !== 30) {
  throw new Error(`Expected 30 level 2 cards, got ${LEVEL_2_CARDS.length}`);
}
if (LEVEL_3_CARDS.length !== 20) {
  throw new Error(`Expected 20 level 3 cards, got ${LEVEL_3_CARDS.length}`);
}
if (ALL_CARDS.length !== 90) {
  throw new Error(`Expected 90 total cards, got ${ALL_CARDS.length}`);
}
