import { GemChip } from './GemChip';
import { REGULAR_GEM_ORDER } from '../../constants/theme';
import type { GemCounts } from '../../types/gems';
import { getGemCount } from '../../game/logic/gems';

interface GemBankProps {
  gems: GemCounts;
}

export function GemBank({ gems }: GemBankProps) {
  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-3 backdrop-blur-sm">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        ✦ 정령석 저장고
      </h2>
      <div className="flex flex-wrap gap-2">
        {REGULAR_GEM_ORDER.map((gem) => (
          <GemChip key={gem} gem={gem} count={getGemCount(gems, gem)} size="md" />
        ))}
        <GemChip gem="giok" count={getGemCount(gems, 'giok')} size="md" />
      </div>
    </section>
  );
}
