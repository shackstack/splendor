import { GemChip } from '../gems/GemChip';
import { formatNobleName, GEM_STYLES } from '../../constants/theme';
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
        <span className="text-xs font-bold text-amber-300">{noble.points}pt</span>
      </div>
      <div className="flex flex-wrap gap-0.5">
        {REGULAR_GEM_TYPES.filter((gem) => (noble.requirements[gem] ?? 0) > 0).map((gem) => {
          const style = GEM_STYLES[gem];
          return (
            <span
              key={gem}
              className={`rounded px-1 text-[10px] font-semibold ${style.bg} ${style.text}`}
            >
              {noble.requirements[gem]}
            </span>
          );
        })}
      </div>
    </div>
  );
}
