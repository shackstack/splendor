import { NobleTile } from '../noble/NobleTile';
import type { Noble } from '../../types/noble';

interface NobleRowProps {
  nobles: Noble[];
  /** GemBank compact와 같은 행에 배치할 때 높이 맞춤 */
  compact?: boolean;
}

export function NobleRow({ nobles, compact }: NobleRowProps) {
  if (nobles.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <section className="flex min-w-0 flex-col rounded-xl border border-violet-800/40 bg-slate-900/70 p-2 backdrop-blur-sm">
        <p className="mb-1.5 shrink-0 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
          신수
        </p>
        <div className="flex min-h-0 flex-1 items-center gap-1.5 overflow-x-auto">
          {nobles.map((noble) => (
            <NobleTile key={noble.id} noble={noble} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-violet-800/40 bg-slate-900/70 p-3 backdrop-blur-sm">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        ✦ 신수 소환
      </h2>
      <div className="flex gap-2 overflow-x-auto px-1 py-2">
        {nobles.map((noble) => (
          <NobleTile key={noble.id} noble={noble} />
        ))}
      </div>
    </section>
  );
}
