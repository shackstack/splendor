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
  { bonus: 'hwangok', points: 0, cost: { heugyoseok: 1, bijae: 1, hongok: 1, baekok: 1 } }, // l1-onyx-01
  { bonus: 'hwangok', points: 0, cost: { heugyoseok: 2, bijae: 1, hongok: 1, baekok: 1 } }, // l1-onyx-02
  { bonus: 'hwangok', points: 0, cost: { heugyoseok: 2, hongok: 1, baekok: 2 } }, // l1-onyx-03
  { bonus: 'hwangok', points: 0, cost: { hwangok: 1, bijae: 1, hongok: 3 } }, // l1-onyx-04
  { bonus: 'hwangok', points: 0, cost: { bijae: 2, hongok: 1 } }, // l1-onyx-05
  { bonus: 'hwangok', points: 0, cost: { bijae: 2, baekok: 2 } }, // l1-onyx-06
  { bonus: 'hwangok', points: 0, cost: { bijae: 3 } }, // l1-onyx-07
  { bonus: 'hwangok', points: 1, cost: { heugyoseok: 4 } }, // l1-onyx-08
  { bonus: 'heugyoseok', points: 0, cost: { hwangok: 1, bijae: 1, hongok: 1, baekok: 1 } }, // l1-sapphire-01
  { bonus: 'heugyoseok', points: 0, cost: { hwangok: 1, bijae: 1, hongok: 2, baekok: 1 } }, // l1-sapphire-02
  { bonus: 'heugyoseok', points: 0, cost: { bijae: 2, hongok: 2, baekok: 1 } }, // l1-sapphire-03
  { bonus: 'heugyoseok', points: 0, cost: { heugyoseok: 1, bijae: 3, hongok: 1 } }, // l1-sapphire-04
  { bonus: 'heugyoseok', points: 0, cost: { hwangok: 2, baekok: 1 } }, // l1-sapphire-05
  { bonus: 'heugyoseok', points: 0, cost: { hwangok: 2, bijae: 2 } }, // l1-sapphire-06
  { bonus: 'heugyoseok', points: 0, cost: { hwangok: 3 } }, // l1-sapphire-07
  { bonus: 'heugyoseok', points: 1, cost: { hongok: 4 } }, // l1-sapphire-08
  { bonus: 'baekok', points: 0, cost: { hwangok: 1, heugyoseok: 1, bijae: 1, hongok: 1 } }, // l1-diamond-01
  { bonus: 'baekok', points: 0, cost: { hwangok: 1, heugyoseok: 1, bijae: 2, hongok: 1 } }, // l1-diamond-02
  { bonus: 'baekok', points: 0, cost: { hwangok: 1, heugyoseok: 2, bijae: 2 } }, // l1-diamond-03
  { bonus: 'baekok', points: 0, cost: { hwangok: 1, heugyoseok: 1, baekok: 3 } }, // l1-diamond-04
  { bonus: 'baekok', points: 0, cost: { hwangok: 1, hongok: 2 } }, // l1-diamond-05
  { bonus: 'baekok', points: 0, cost: { hwangok: 2, heugyoseok: 2 } }, // l1-diamond-06
  { bonus: 'baekok', points: 0, cost: { heugyoseok: 3 } }, // l1-diamond-07
  { bonus: 'baekok', points: 1, cost: { bijae: 4 } }, // l1-diamond-08
  { bonus: 'bijae', points: 0, cost: { hwangok: 1, heugyoseok: 1, hongok: 1, baekok: 1 } }, // l1-emerald-01
  { bonus: 'bijae', points: 0, cost: { hwangok: 2, heugyoseok: 1, hongok: 1, baekok: 1 } }, // l1-emerald-02
  { bonus: 'bijae', points: 0, cost: { hwangok: 2, heugyoseok: 1, hongok: 2 } }, // l1-emerald-03
  { bonus: 'bijae', points: 0, cost: { heugyoseok: 3, bijae: 1, baekok: 1 } }, // l1-emerald-04
  { bonus: 'bijae', points: 0, cost: { heugyoseok: 1, baekok: 2 } }, // l1-emerald-05
  { bonus: 'bijae', points: 0, cost: { heugyoseok: 2, hongok: 2 } }, // l1-emerald-06
  { bonus: 'bijae', points: 0, cost: { hongok: 3 } }, // l1-emerald-07
  { bonus: 'bijae', points: 1, cost: { hwangok: 4 } }, // l1-emerald-08
  { bonus: 'hongok', points: 0, cost: { hwangok: 1, heugyoseok: 1, bijae: 1, baekok: 1 } }, // l1-ruby-01
  { bonus: 'hongok', points: 0, cost: { hwangok: 1, heugyoseok: 1, bijae: 1, baekok: 2 } }, // l1-ruby-02
  { bonus: 'hongok', points: 0, cost: { hwangok: 2, bijae: 1, baekok: 2 } }, // l1-ruby-03
  { bonus: 'hongok', points: 0, cost: { hwangok: 3, hongok: 1, baekok: 1 } }, // l1-ruby-04
  { bonus: 'hongok', points: 0, cost: { heugyoseok: 2, bijae: 1 } }, // l1-ruby-05
  { bonus: 'hongok', points: 0, cost: { hongok: 2, baekok: 2 } }, // l1-ruby-06
  { bonus: 'hongok', points: 0, cost: { baekok: 3 } }, // l1-ruby-07
  { bonus: 'hongok', points: 1, cost: { baekok: 4 } }, // l1-ruby-08
];

export const LEVEL_1_CARDS = buildCards(1, RAW_LEVEL_1_CARDS);

const RAW_LEVEL_2_CARDS: RawCard[] = [
  { bonus: 'hwangok', points: 1, cost: { heugyoseok: 2, bijae: 2, baekok: 3 } }, // l2-onyx-01
  { bonus: 'hwangok', points: 1, cost: { hwangok: 2, bijae: 3, baekok: 3 } }, // l2-onyx-02
  { bonus: 'hwangok', points: 2, cost: { heugyoseok: 1, bijae: 4, hongok: 2 } }, // l2-onyx-03
  { bonus: 'hwangok', points: 2, cost: { bijae: 5, hongok: 3 } }, // l2-onyx-04
  { bonus: 'hwangok', points: 2, cost: { baekok: 5 } }, // l2-onyx-05
  { bonus: 'hwangok', points: 3, cost: { hwangok: 6 } }, // l2-onyx-06
  { bonus: 'heugyoseok', points: 1, cost: { heugyoseok: 2, bijae: 2, hongok: 3 } }, // l2-sapphire-01
  { bonus: 'heugyoseok', points: 1, cost: { hwangok: 3, heugyoseok: 2, bijae: 3 } }, // l2-sapphire-02
  { bonus: 'heugyoseok', points: 2, cost: { heugyoseok: 3, baekok: 5 } }, // l2-sapphire-03
  { bonus: 'heugyoseok', points: 2, cost: { hwangok: 4, hongok: 1, baekok: 2 } }, // l2-sapphire-04
  { bonus: 'heugyoseok', points: 2, cost: { heugyoseok: 5 } }, // l2-sapphire-05
  { bonus: 'heugyoseok', points: 3, cost: { heugyoseok: 6 } }, // l2-sapphire-06
  { bonus: 'baekok', points: 1, cost: { hwangok: 2, bijae: 3, hongok: 2 } }, // l2-diamond-01
  { bonus: 'baekok', points: 1, cost: { heugyoseok: 3, hongok: 3, baekok: 2 } }, // l2-diamond-02
  { bonus: 'baekok', points: 2, cost: { hwangok: 2, bijae: 1, hongok: 4 } }, // l2-diamond-03
  { bonus: 'baekok', points: 2, cost: { hwangok: 3, hongok: 5 } }, // l2-diamond-04
  { bonus: 'baekok', points: 2, cost: { hongok: 5 } }, // l2-diamond-05
  { bonus: 'baekok', points: 3, cost: { baekok: 6 } }, // l2-diamond-06
  { bonus: 'bijae', points: 1, cost: { bijae: 2, hongok: 3, baekok: 3 } }, // l2-emerald-01
  { bonus: 'bijae', points: 1, cost: { hwangok: 2, heugyoseok: 3, baekok: 2 } }, // l2-emerald-02
  { bonus: 'bijae', points: 2, cost: { hwangok: 1, heugyoseok: 2, baekok: 4 } }, // l2-emerald-03
  { bonus: 'bijae', points: 2, cost: { heugyoseok: 5, bijae: 3 } }, // l2-emerald-04
  { bonus: 'bijae', points: 2, cost: { bijae: 5 } }, // l2-emerald-05
  { bonus: 'bijae', points: 3, cost: { bijae: 6 } }, // l2-emerald-06
  { bonus: 'hongok', points: 1, cost: { hwangok: 3, hongok: 2, baekok: 2 } }, // l2-ruby-01
  { bonus: 'hongok', points: 1, cost: { hwangok: 3, heugyoseok: 3, hongok: 2 } }, // l2-ruby-02
  { bonus: 'hongok', points: 2, cost: { heugyoseok: 4, bijae: 2, baekok: 1 } }, // l2-ruby-03
  { bonus: 'hongok', points: 2, cost: { hwangok: 5, baekok: 3 } }, // l2-ruby-04
  { bonus: 'hongok', points: 2, cost: { hwangok: 5 } }, // l2-ruby-05
  { bonus: 'hongok', points: 3, cost: { hongok: 6 } }, // l2-ruby-06
];

export const LEVEL_2_CARDS = buildCards(2, RAW_LEVEL_2_CARDS);

const RAW_LEVEL_3_CARDS: RawCard[] = [
  { bonus: 'hwangok', points: 3, cost: { heugyoseok: 3, bijae: 5, hongok: 3, baekok: 3 } }, // l3-onyx-01
  { bonus: 'hwangok', points: 4, cost: { hongok: 7 } }, // l3-onyx-02
  { bonus: 'hwangok', points: 4, cost: { hwangok: 3, bijae: 3, hongok: 6 } }, // l3-onyx-03
  { bonus: 'hwangok', points: 5, cost: { hwangok: 3, hongok: 7 } }, // l3-onyx-04
  { bonus: 'heugyoseok', points: 3, cost: { hwangok: 5, bijae: 3, hongok: 3, baekok: 3 } }, // l3-sapphire-01
  { bonus: 'heugyoseok', points: 4, cost: { baekok: 7 } }, // l3-sapphire-02
  { bonus: 'heugyoseok', points: 4, cost: { hwangok: 3, heugyoseok: 3, baekok: 6 } }, // l3-sapphire-03
  { bonus: 'heugyoseok', points: 5, cost: { heugyoseok: 3, baekok: 7 } }, // l3-sapphire-04
  { bonus: 'baekok', points: 3, cost: { hwangok: 3, heugyoseok: 3, bijae: 3, hongok: 5 } }, // l3-diamond-01
  { bonus: 'baekok', points: 4, cost: { hwangok: 7 } }, // l3-diamond-02
  { bonus: 'baekok', points: 4, cost: { hwangok: 6, hongok: 3, baekok: 3 } }, // l3-diamond-03
  { bonus: 'baekok', points: 5, cost: { hwangok: 7, baekok: 3 } }, // l3-diamond-04
  { bonus: 'bijae', points: 3, cost: { hwangok: 3, heugyoseok: 3, hongok: 3, baekok: 5 } }, // l3-emerald-01
  { bonus: 'bijae', points: 4, cost: { heugyoseok: 7 } }, // l3-emerald-02
  { bonus: 'bijae', points: 4, cost: { heugyoseok: 6, bijae: 3, baekok: 3 } }, // l3-emerald-03
  { bonus: 'bijae', points: 5, cost: { heugyoseok: 7, bijae: 3 } }, // l3-emerald-04
  { bonus: 'hongok', points: 3, cost: { hwangok: 3, heugyoseok: 5, bijae: 3, baekok: 3 } }, // l3-ruby-01
  { bonus: 'hongok', points: 4, cost: { bijae: 7 } }, // l3-ruby-02
  { bonus: 'hongok', points: 4, cost: { heugyoseok: 3, bijae: 6, hongok: 3 } }, // l3-ruby-03
  { bonus: 'hongok', points: 5, cost: { bijae: 7, hongok: 3 } }, // l3-ruby-04
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
