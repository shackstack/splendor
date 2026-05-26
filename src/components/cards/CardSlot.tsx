import { CardTile } from './CardTile';
import type { Card } from '../../types/card';

interface CardSlotProps {
  card: Card | null;
  selected?: boolean;
  onClick?: () => void;
}

export function CardSlot({ card, selected, onClick }: CardSlotProps) {
  if (!card) {
    return (
      <div className="flex min-h-[88px] min-w-[72px] items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-800/40">
        <span className="text-xs text-slate-600">—</span>
      </div>
    );
  }

  return <CardTile card={card} selected={selected} compact onClick={onClick} />;
}
