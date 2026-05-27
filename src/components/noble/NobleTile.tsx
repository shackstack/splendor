import { formatNobleName } from '../../constants/theme';
import { GemCountBadge } from '../gems/GemIcon';
import { PointValue } from '../points/PointValue';
import type { Noble } from '../../types/noble';
import { REGULAR_GEM_TYPES } from '../../types/gems';

interface NobleTileProps {
  noble: Noble;
}

export function NobleTile({ noble }: NobleTileProps) {
  return (
    <div className="min-w-[100px] rounded-lg border border-purple-500/50 bg-gradient-to-br from-purple-900/80 to-slate-800 p-2 shadow-md">
      <div className="mb-1 flex items-center justify-between">
        <span className="truncate text-[10px] font-semibold text-purple-200">
          {formatNobleName(noble.id)}
        </span>
        <PointValue
          value={noble.points}
          className="text-xs font-bold text-amber-300"
          hideZero={false}
        />
      </div>
      <div className="flex flex-wrap gap-0.5">
        {REGULAR_GEM_TYPES.filter((gem) => (noble.requirements[gem] ?? 0) > 0).map((gem) => (
          <GemCountBadge key={gem} gem={gem} count={noble.requirements[gem] ?? 0} />
        ))}
      </div>
    </div>
  );
}
