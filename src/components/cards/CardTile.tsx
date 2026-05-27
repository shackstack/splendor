import { CARD_LEVEL_STYLES } from "../../constants/theme";
import { getNetGemCost } from "../../game/logic/player";
import { GemCountBadge, GemIcon } from "../gems/GemIcon";
import { PointValue } from "../points/PointValue";
import type { Card } from "../../types/card";
import type { RegularGemCounts } from "../../types/gems";
import { REGULAR_GEM_TYPES } from "../../types/gems";

interface CardTileProps {
  card: Card;
  selected?: boolean;
  compact?: boolean;
  purchasable?: boolean;
  costColumn?: boolean;
  playerBonuses?: RegularGemCounts;
  onClick?: () => void;
}

export function CardTile({
  card,
  selected = false,
  compact = false,
  purchasable = false,
  costColumn = false,
  playerBonuses,
  onClick,
}: CardTileProps) {
  const netCost = playerBonuses ? getNetGemCost(card, playerBonuses) : null;
  const levelStyle = CARD_LEVEL_STYLES[card.level];
  const Component = onClick ? "button" : "div";
  const showPurchasableGlow = purchasable && !selected;

  return (
    <div className="relative shrink-0">
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
          "relative z-[1] flex w-full flex-col overflow-hidden rounded-lg border-2 text-left shadow-md",
          levelStyle.border,
          selected
            ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900"
            : "",
          onClick ? "active:scale-[0.98]" : "",
          compact ? "min-h-[112px] min-w-[100px]" : "min-w-[80px]",
        ].join(" ")}
      >
        <div
          className={`flex items-center justify-between px-2 py-1 ${levelStyle.header} text-white`}
        >
          <div className="flex items-center gap-1">
            <GemIcon gem={card.bonus} size="sm" />
          </div>
          <PointValue
            value={card.points}
            className="text-xs font-bold"
            iconClassName="size-3 text-amber-200"
          />
        </div>

        <div className="flex flex-1 flex-col gap-1 bg-slate-800 p-2">
          <div className={costColumn ? "flex w-fit flex-col items-start gap-0.5" : "flex flex-wrap gap-0.5"}>
            {REGULAR_GEM_TYPES.filter((gem) => (card.cost[gem] ?? 0) > 0).map(
              (gem) => {
                const original = card.cost[gem] ?? 0;
                const discounted = netCost ? (netCost[gem] ?? 0) : original;

                return (
                  <GemCountBadge
                    key={gem}
                    gem={gem}
                    count={original}
                    discountedCount={
                      netCost && discounted < original ? discounted : undefined
                    }
                  />
                );
              },
            )}
          </div>
        </div>
      </Component>
    </div>
  );
}
