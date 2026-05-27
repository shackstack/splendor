import { GemChip } from './GemChip';
import { REGULAR_GEM_ORDER } from '../../constants/theme';
import type { GemCounts } from '../../types/gems';
import { getGemCount } from '../../game/logic/gems';

interface GemHandProps {
  gems: GemCounts;
}

export function GemHand({ gems }: GemHandProps) {
  const owned = [...REGULAR_GEM_ORDER, 'giok' as const].filter(
    (gem) => getGemCount(gems, gem) > 0,
  );

  if (owned.length === 0) {
    return <p className="text-sm text-slate-500">정령석 없음</p>;
  }

  return (
    <div className="flex flex-wrap gap-1.5">
      {owned.map((gem) => (
        <GemChip key={gem} gem={gem} count={getGemCount(gems, gem)} size="sm" />
      ))}
    </div>
  );
}
