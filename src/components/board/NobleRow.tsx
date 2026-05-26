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
    <section className="rounded-xl border border-slate-700 bg-slate-800/80 p-3">
      <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
        귀족
      </h2>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {nobles.map((noble) => (
          <NobleTile key={noble.id} noble={noble} />
        ))}
      </div>
    </section>
  );
}
