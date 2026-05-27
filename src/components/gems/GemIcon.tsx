import { GEM_ICONS } from '../../assets/gems';
import { GEM_LABELS } from '../../constants/theme';
import type { GemType, RegularGemType } from '../../types/gems';

const SIZE_CLASS = {
  xs: 'h-3.5 w-3.5',
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

interface GemIconProps {
  gem: GemType;
  size?: keyof typeof SIZE_CLASS;
  className?: string;
}

export function GemIcon({ gem, size = 'md', className = '' }: GemIconProps) {
  return (
    <img
      src={GEM_ICONS[gem]}
      alt={GEM_LABELS[gem]}
      className={`${SIZE_CLASS[size]} shrink-0 ${className}`.trim()}
      draggable={false}
    />
  );
}

interface GemCountBadgeProps {
  gem: RegularGemType;
  count: number;
  discountedCount?: number;
}

export function GemCountBadge({ gem, count, discountedCount }: GemCountBadgeProps) {
  const hasDiscount =
    discountedCount !== undefined && discountedCount < count;

  return (
    <span className="inline-flex w-fit shrink-0 items-center gap-0.5 rounded-md bg-slate-900/70 px-1 py-0.5">
      <GemIcon gem={gem} size="xs" />
      {hasDiscount ? (
        <span className="inline-flex items-center gap-0.5 text-[10px] font-bold leading-none tabular-nums">
          <span className="text-slate-400 line-through">{count}</span>
          <span className="text-emerald-300">{discountedCount}</span>
        </span>
      ) : (
        <span className="text-[10px] font-bold leading-none text-white tabular-nums">
          {count}
        </span>
      )}
    </span>
  );
}
