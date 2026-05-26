import type { Noble, RegularGemCounts } from '../types/index';

type RawNoble = {
  id: string;
  requirements: RegularGemCounts;
};

const RAW_NOBLES: RawNoble[] = [
  { id: 'mary-stuart', requirements: { emerald: 4, ruby: 4 } },
  { id: 'suleiman', requirements: { emerald: 4, sapphire: 4 } },
  { id: 'machiavelli', requirements: { diamond: 4, sapphire: 4 } },
  { id: 'isabella', requirements: { onyx: 4, diamond: 4 } },
  { id: 'henry-viii', requirements: { onyx: 4, emerald: 4 } },
  { id: 'charles-v', requirements: { onyx: 3, ruby: 3, diamond: 3 } },
  { id: 'catherine', requirements: { emerald: 3, ruby: 3, sapphire: 3 } },
  { id: 'anne-brittany', requirements: { emerald: 3, diamond: 3, sapphire: 3 } },
  { id: 'elisabeth', requirements: { diamond: 3, onyx: 3, sapphire: 3 } },
  { id: 'francis-i', requirements: { emerald: 3, onyx: 3, ruby: 3 } },
];

export const ALL_NOBLES: Noble[] = RAW_NOBLES.map(({ id, requirements }) => ({
  id,
  requirements,
  points: 3,
}));

if (ALL_NOBLES.length !== 10) {
  throw new Error(`Expected 10 nobles, got ${ALL_NOBLES.length}`);
}
