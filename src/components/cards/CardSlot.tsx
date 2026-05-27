import { CardActionOverlay } from './CardActionOverlay';
import { CardTile } from './CardTile';
import { CARD_TILE_SIZE } from '../../constants/theme';
import type { CardSelection } from '../../store/uiStore';
import type { Action } from '../../types';
import type { Card } from '../../types/card';
import type { RegularGemCounts } from '../../types/gems';

interface CardSlotProps {
  card: Card | null;
  selected?: boolean;
  purchasable?: boolean;
  playerBonuses?: RegularGemCounts;
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
  playerBonuses,
  selection,
  onClick,
  onDismiss,
  onAction,
  reserveAction,
  purchaseAction,
}: CardSlotProps) {
  if (!card) {
    return (
      <div
        className={`flex shrink-0 items-center justify-center rounded-lg border border-dashed border-slate-600 bg-slate-800/40 ${CARD_TILE_SIZE.className}`}
      >
        <span className="text-xs text-slate-600">—</span>
      </div>
    );
  }

  const showOverlay = selected && selection && onDismiss && onAction;

  return (
    <div className="relative shrink-0">
      <CardTile
        card={card}
        selected={selected}
        purchasable={purchasable}
        playerBonuses={playerBonuses}
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
