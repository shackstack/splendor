import { NobleTile } from '../noble/NobleTile';
import type { Noble } from '../../types/noble';

interface NobleRowProps {
  nobles: Noble[];
}

export function NobleRow({ nobles }: NobleRowProps) {
  if (nobles.length === 0) {
    return null;
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
