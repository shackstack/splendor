import { CardActionOverlay } from './CardActionOverlay';
import { CardTile } from './CardTile';
import type { CardSelection } from '../../store/uiStore';
import type { Action } from '../../types';
import type { Card } from '../../types/card';

interface CardSlotProps {
  card: Card | null;
  selected?: boolean;
  purchasable?: boolean;
  selection?: CardSelection;
  onClick?: () => void;
  onDismiss?: () => void;
  onAction?: (action: Action) => void;
  reserveAction?: Action | null;
  purchaseAction?: Action | null;
}

export function CardSlot({
  card,
  selected,
  purchasable = false,
  selection,
  onClick,
  onDismiss,
  onAction,
  reserveAction,
  purchaseAction,
}: CardSlotProps) {
  if (!card) {
    return (
      <div className="flex min-h-[88px] min-w-[72px] items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-800/40">
        <span className="text-xs text-slate-600">—</span>
      </div>
    );
  }

  const showOverlay = selected && selection && onDismiss && onAction;

  return (
    <div className="relative shrink-0">
      <CardTile
        card={card}
        compact
        costColumn
        selected={selected}
        purchasable={purchasable}
        onClick={onClick}
      />
      {showOverlay && (
        <CardActionOverlay
          showReserve={selection.kind !== 'reserved'}
          showPurchase={selection.kind !== 'deck'}
          reserveEnabled={!!reserveAction}
          purchaseEnabled={!!purchaseAction}
          onReserve={() => reserveAction && onAction(reserveAction)}
          onPurchase={() => purchaseAction && onAction(purchaseAction)}
          onDismiss={onDismiss}
        />
      )}
    </div>
  );
}
