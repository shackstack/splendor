import {
  NOBLE_NAMES,
  NOBLE_DESCRIPTIONS,
  NOBLE_COLORS,
  NOBLE_TILE_SIZE,
} from "../../constants/theme";
import { NOBLE_ART } from "../../assets/nobles";
import { GemCountBadge } from "../gems/GemIcon";
import { PointValue } from "../points/PointValue";
import type { Noble } from "../../types/noble";
import { REGULAR_GEM_TYPES } from "../../types/gems";

interface NobleTileProps {
  noble: Noble;
  compact?: boolean;
}

export function NobleTile({ noble, compact = false }: NobleTileProps) {
  const name = NOBLE_NAMES[noble.id] ?? noble.id;
  const desc = NOBLE_DESCRIPTIONS[noble.id] ?? "";
  const colors = NOBLE_COLORS[noble.id] ?? {
    bg: "from-purple-900/90 to-slate-800",
    border: "border-purple-500/50",
    glow: "#a78bfa",
  };
  const art = NOBLE_ART[noble.id];
  const costGems = REGULAR_GEM_TYPES.filter(
    (g) => (noble.requirements[g] ?? 0) > 0
  );

  return (
    <div
      className={[
        "relative shrink-0 overflow-hidden rounded-xl border-2 shadow-lg",
        NOBLE_TILE_SIZE.className,
        colors.border,
      ].join(" ")}
      style={{ height: compact ? "88px" : "130px" }}
    >
      {/* 신수 아트 배경 */}
      {art && (
        <img
          src={art}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      )}

      {/* 상단 이름 + 점수 오버레이 */}
      <div
        className="absolute inset-x-0 top-0 flex items-center justify-between px-2 py-1"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[11px] font-bold leading-tight text-white drop-shadow">
            {name}
          </span>
          {desc && (
            <span className="text-[9px] leading-tight text-white/60">
              {desc}
            </span>
          )}
        </div>
        <PointValue
          value={noble.points}
          className="shrink-0 text-xs font-bold text-amber-300"
          hideZero={false}
        />
      </div>

      {/* 하단 요구 보석 오버레이 */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 px-1.5 py-1.5"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0) 100%)",
        }}
      >
        {costGems.map((gem) => (
          <GemCountBadge
            key={gem}
            gem={gem}
            count={noble.requirements[gem] ?? 0}
          />
        ))}
      </div>
    </div>
  );
}
