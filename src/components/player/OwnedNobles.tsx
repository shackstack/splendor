import { NobleTile } from '../noble/NobleTile';
import type { Noble } from '../../types/noble';

interface OwnedNoblesProps {
  nobles: Noble[];
}

export function OwnedNobles({ nobles }: OwnedNoblesProps) {
  if (nobles.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 overflow-x-auto px-1 py-2">
      {nobles.map((noble) => (
        <NobleTile key={noble.id} noble={noble} />
      ))}
    </div>
  );
}
