import { CardTile } from '../cards/CardTile';
import type { CardSelection } from '../../store/uiStore';
import type { Card } from '../../types/card';

interface ReservedCardsProps {
  cards: Card[];
  selectedCard: CardSelection | null;
  onSelectCard?: (source: CardSelection) => void;
  interactive?: boolean;
}

function isReservedSelected(
  selected: CardSelection | null,
  index: number,
): boolean {
  return selected?.kind === 'reserved' && selected.index === index;
}

export function ReservedCards({
  cards,
  selectedCard,
  onSelectCard,
  interactive = false,
}: ReservedCardsProps) {
  if (cards.length === 0) {
    return <p className="text-xs text-slate-500">예약 없음</p>;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {cards.map((card, index) => (
        <div key={`${card.id}-${index}`} className="w-[72px] shrink-0">
          <CardTile
            card={card}
            compact
            selected={isReservedSelected(selectedCard, index)}
            onClick={
              interactive && onSelectCard
                ? () => onSelectCard({ kind: 'reserved', index })
                : undefined
            }
          />
        </div>
      ))}
    </div>
  );
}
