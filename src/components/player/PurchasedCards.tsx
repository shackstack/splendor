import { CardTile } from '../cards/CardTile';
import type { Card } from '../../types/card';

interface PurchasedCardsProps {
  cards: Card[];
}

export function PurchasedCards({ cards }: PurchasedCardsProps) {
  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 overflow-x-auto px-1 py-2">
      {cards.map((card, index) => (
        <CardTile key={`${card.id}-${index}`} card={card} />
      ))}
    </div>
  );
}
