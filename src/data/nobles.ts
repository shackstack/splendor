import type { Noble, RegularGemCounts } from '../types/index';

type RawNoble = {
  id: string;
  requirements: RegularGemCounts;
};

const RAW_NOBLES: RawNoble[] = [
  { id: 'mary-stuart', requirements: { bijae: 4, hongok: 4 } },
  { id: 'suleiman', requirements: { bijae: 4, heugyoseok: 4 } },
  { id: 'machiavelli', requirements: { baekok: 4, heugyoseok: 4 } },
  { id: 'isabella', requirements: { hwangok: 4, baekok: 4 } },
  { id: 'henry-viii', requirements: { hwangok: 4, bijae: 4 } },
  { id: 'charles-v', requirements: { hwangok: 3, hongok: 3, baekok: 3 } },
  { id: 'catherine', requirements: { bijae: 3, hongok: 3, heugyoseok: 3 } },
  { id: 'anne-brittany', requirements: { bijae: 3, baekok: 3, heugyoseok: 3 } },
  { id: 'elisabeth', requirements: { baekok: 3, hwangok: 3, heugyoseok: 3 } },
  { id: 'francis-i', requirements: { bijae: 3, hwangok: 3, hongok: 3 } },
];

export const ALL_NOBLES: Noble[] = RAW_NOBLES.map(({ id, requirements }) => ({
  id,
  requirements,
  points: 3,
}));

if (ALL_NOBLES.length !== 10) {
  throw new Error(`Expected 10 nobles, got ${ALL_NOBLES.length}`);
}
