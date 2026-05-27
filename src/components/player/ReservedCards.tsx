import { CardActionOverlay } from '../cards/CardActionOverlay';
import { CardTile } from '../cards/CardTile';
import type { CardSelection } from '../../store/uiStore';
import type { Action } from '../../types';
import type { Card } from '../../types/card';
import type { RegularGemCounts } from '../../types/gems';

interface ReservedCardsProps {
  cards: Card[];
  selectedCard: CardSelection | null;
  playerBonuses?: RegularGemCounts;
  onSelectCard?: (source: CardSelection) => void;
  onDismiss?: () => void;
  onAction?: (action: Action) => void;
  getCardActions?: (selection: CardSelection) => {
    reserveAction: Action | null;
    purchaseAction: Action | null;
  };
  canAffordCard?: (card: Card) => boolean;
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
  onDismiss,
  onAction,
  getCardActions,
  canAffordCard,
  playerBonuses,
  interactive = false,
}: ReservedCardsProps) {
  if (cards.length === 0) {
    return <p className="text-xs text-slate-500">예약 없음</p>;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {cards.map((card, index) => {
        const selection: CardSelection = { kind: 'reserved', index };
        const selected = isReservedSelected(selectedCard, index);
        const actions = selected && getCardActions ? getCardActions(selection) : null;
        const showOverlay = selected && onDismiss && onAction;

        return (
          <div key={`${card.id}-${index}`} className="relative shrink-0">
            <CardTile
              card={card}
              compact
              selected={selected}
              purchasable={interactive && !!canAffordCard?.(card)}
              playerBonuses={playerBonuses}
              onClick={
                interactive && onSelectCard
                  ? () => onSelectCard(selection)
                  : undefined
              }
            />
            {showOverlay && (
              <CardActionOverlay
                showReserve={false}
                showPurchase
                reserveEnabled={false}
                purchaseEnabled={!!actions?.purchaseAction}
                onReserve={() => {}}
                onPurchase={() =>
                  actions?.purchaseAction && onAction(actions.purchaseAction)
                }
                onDismiss={onDismiss}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
