import { GEM_LABELS, GEM_STYLES } from '../../constants/theme';
import type { GemType } from '../../types/gems';

interface GemChipProps {
  gem: GemType;
  count?: number;
  size?: 'sm' | 'md';
  selected?: boolean;
  disabled?: boolean;
  draggable?: boolean;
  showCount?: boolean;
  onClick?: () => void;
  onPointerDown?: (event: React.PointerEvent) => void;
  onPointerMove?: (event: React.PointerEvent) => void;
  onPointerUp?: (event: React.PointerEvent) => void;
  onPointerCancel?: (event: React.PointerEvent) => void;
}

export function GemChip({
  gem,
  count,
  size = 'md',
  selected = false,
  disabled = false,
  draggable = false,
  showCount = true,
  onClick,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
}: GemChipProps) {
  const style = GEM_STYLES[gem];
  const sizeClass = size === 'sm' ? 'h-7 min-w-7 px-1.5 text-xs' : 'h-9 min-w-9 px-2 text-sm';
  const interactive = Boolean(onClick) || draggable;
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={draggable && !disabled ? onPointerDown : undefined}
      onPointerMove={draggable && !disabled ? onPointerMove : undefined}
      onPointerUp={draggable && !disabled ? onPointerUp : undefined}
      onPointerCancel={draggable && !disabled ? onPointerCancel : undefined}
      className={[
        'inline-flex items-center justify-center gap-1 rounded-full font-semibold ring-2',
        sizeClass,
        style.bg,
        style.text,
        style.ring,
        selected ? 'ring-offset-2 ring-offset-slate-900 ring-white' : '',
        interactive && !disabled ? 'cursor-grab active:cursor-grabbing active:scale-95' : '',
        draggable && !disabled ? 'touch-none select-none' : '',
        disabled ? 'opacity-40' : '',
      ].join(' ')}
      title={GEM_LABELS[gem]}
    >
      <span className="truncate">{GEM_LABELS[gem].slice(0, 1)}</span>
      {showCount && count !== undefined && <span>{count}</span>}
    </Component>
  );
}
