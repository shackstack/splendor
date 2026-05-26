import type { DragEvent } from 'react';

import { GEM_LABELS, GEM_STYLES } from '../../constants/theme';
import { GEM_DRAG_TYPE } from '../../utils/gemBasket';
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
  onDragStart?: (event: DragEvent) => void;
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
  onDragStart,
}: GemChipProps) {
  const style = GEM_STYLES[gem];
  const sizeClass = size === 'sm' ? 'h-7 min-w-7 px-1.5 text-xs' : 'h-9 min-w-9 px-2 text-sm';
  const interactive = Boolean(onClick) || draggable;
  const Component = onClick ? 'button' : 'div';

  const handleDragStart = (event: DragEvent) => {
    event.dataTransfer.setData(GEM_DRAG_TYPE, gem);
    event.dataTransfer.effectAllowed = 'copy';
    onDragStart?.(event);
  };

  return (
    <Component
      type={onClick ? 'button' : undefined}
      disabled={disabled}
      draggable={draggable && !disabled}
      onClick={onClick}
      onDragStart={draggable ? handleDragStart : undefined}
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
