import { GemChip } from "./GemChip";
import { REGULAR_GEM_ORDER } from "../../constants/theme";
import type { GemCounts } from "../../types/gems";
import { getGemCount } from "../../game/logic/gems";

interface GemBankProps {
  gems: GemCounts;
  /** 사이드 레일에 넣기 위한 컴팩트 그리드 레이아웃 */
  compact?: boolean;
}

export function GemBank({ gems, compact }: GemBankProps) {
  if (compact) {
    return (
      <section className="flex h-full min-h-0 flex-col rounded-xl border border-slate-700/60 bg-slate-900/70 p-2 backdrop-blur-sm">
        <p className="mb-1.5 shrink-0 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
          저장고
        </p>
        <div className="grid flex-1 grid-cols-2 grid-rows-3 content-center gap-1">
          {REGULAR_GEM_ORDER.map((gem) => (
            <GemChip
              key={gem}
              gem={gem}
              count={getGemCount(gems, gem)}
              size="sm"
            />
          ))}
          {/* giok (기운석) — 6번째 칸 */}
          <GemChip gem="giok" count={getGemCount(gems, "giok")} size="sm" />
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-3 backdrop-blur-sm">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        ✦ 정령석 저장고
      </h2>
      <div className="flex flex-wrap gap-2">
        {REGULAR_GEM_ORDER.map((gem) => (
          <GemChip
            key={gem}
            gem={gem}
            count={getGemCount(gems, gem)}
            size="md"
          />
        ))}
        <GemChip gem="giok" count={getGemCount(gems, "giok")} size="md" />
      </div>
    </section>
  );
}
