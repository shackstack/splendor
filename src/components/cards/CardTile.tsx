import { CARD_LEVEL_STYLES, CARD_TILE_SIZE } from "../../constants/theme";
import { getNetGemCost } from "../../game/logic/player";
import { GemCountBadge, GemIcon } from "../gems/GemIcon";
import { PointValue } from "../points/PointValue";
import { CARD_ART } from "../../assets/cards";
import type { Card } from "../../types/card";
import type { RegularGemCounts } from "../../types/gems";
import { REGULAR_GEM_TYPES } from "../../types/gems";

interface CardTileProps {
  card: Card;
  selected?: boolean;
  purchasable?: boolean;
  playerBonuses?: RegularGemCounts;
  onClick?: () => void;
}

export function CardTile({
  card,
  selected = false,
  purchasable = false,
  playerBonuses,
  onClick,
}: CardTileProps) {
  const netCost = playerBonuses ? getNetGemCost(card, playerBonuses) : null;
  const levelStyle = CARD_LEVEL_STYLES[card.level];
  const Component = onClick ? "button" : "div";
  const showPurchasableGlow = purchasable && !selected;
  const costGems = REGULAR_GEM_TYPES.filter((gem) => (card.cost[gem] ?? 0) > 0);

  return (
    <div className="relative shrink-0 overflow-hidden">
      {showPurchasableGlow && (
        <>
          <div className="animated-border-box-glow" aria-hidden />
          <div className="animated-border-box" aria-hidden />
        </>
      )}
      <Component
        type={onClick ? "button" : undefined}
        onClick={onClick}
        className={[
          "relative z-[1] flex flex-col overflow-hidden rounded-lg border-2 text-left shadow-md",
          CARD_TILE_SIZE.className,
          levelStyle.border,
          selected ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900" : "",
          onClick ? "active:scale-[0.98]" : "",
        ].join(" ")}
      >
        {/* 헤더: 정령 등급 + 보너스 정령석 + 점수 */}
        <div className={`flex shrink-0 items-center justify-between px-2 py-1 ${levelStyle.header} text-white`}>
          <div className="flex items-center gap-1">
            <GemIcon gem={card.bonus} size="sm" />
            <span className="text-[9px] font-semibold opacity-80">
              {levelStyle.label}
            </span>
          </div>
          <PointValue
            value={card.points}
            className="text-xs font-bold"
            iconClassName="size-3 text-amber-200"
          />
        </div>

        {/* 마법진 아트 + 비용 오버레이 */}
        <div className="relative min-h-0 flex-1 overflow-hidden">
          {/* 마법진 배경 */}
          <img
            src={CARD_ART[card.bonus]}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />

          {/* 비용 없을 때 중앙 정렬 여백 */}
          {costGems.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] font-semibold text-white/40">소환 무비용</span>
            </div>
          )}

          {/* 하단 그라디언트 + 비용 배지 */}
          {costGems.length > 0 && (
            <>
              <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-0.5 p-1.5">
                {costGems.map((gem) => {
                  const original   = card.cost[gem] ?? 0;
                  const discounted = netCost ? (netCost[gem] ?? 0) : original;
                  return (
                    <GemCountBadge
                      key={gem}
                      gem={gem}
                      count={original}
                      discountedCount={netCost && discounted < original ? discounted : undefined}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </Component>
    </div>
  );
}
