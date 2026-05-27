import { GEM_LABELS, GEM_STYLES } from "../../constants/theme";
import type { GemType } from "../../types/gems";
import { GemIcon } from "./GemIcon";

interface GemChipProps {
  gem: GemType;
  count?: number;
  size?: "sm" | "md";
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
  size = "md",
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
  const sizeClass =
    size === "sm" ? "h-7 min-w-7 px-1 text-xs" : "h-9 min-w-9 px-1.5 text-sm";
  const iconSize = size === "sm" ? "sm" : "md";
  const interactive = Boolean(onClick) || draggable;
  const Component = onClick ? "button" : "div";

  return (
    <Component
      type={onClick ? "button" : undefined}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={draggable && !disabled ? onPointerDown : undefined}
      onPointerMove={draggable && !disabled ? onPointerMove : undefined}
      onPointerUp={draggable && !disabled ? onPointerUp : undefined}
      onPointerCancel={draggable && !disabled ? onPointerCancel : undefined}
      className={[
        "inline-flex items-center justify-center gap-0.5 rounded-full bg-slate-700/60 font-semibold text-white",
        sizeClass,
        interactive && !disabled
          ? "cursor-grab active:cursor-grabbing active:scale-95"
          : "",
        draggable && !disabled ? "touch-none select-none" : "",
        disabled ? "opacity-40" : "",
      ].join(" ")}
      title={GEM_LABELS[gem]}
    >
      <GemIcon gem={gem} size={iconSize} />
      {showCount && count !== undefined && <span>{count}</span>}
    </Component>
  );
}
