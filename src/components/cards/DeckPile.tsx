import { CardActionOverlay } from './CardActionOverlay';
import { CARD_LEVEL_STYLES } from '../../constants/theme';
import type { CardSelection } from '../../store/uiStore';
import type { Action } from '../../types';
import type { CardLevel } from '../../types/card';

interface DeckPileProps {
  level: CardLevel;
  count: number;
  selected?: boolean;
  selection?: CardSelection;
  onClick?: () => void;
  onDismiss?: () => void;
  onAction?: (action: Action) => void;
  reserveAction?: Action | null;
}

export function DeckPile({
  level,
  count,
  selected,
  selection,
  onClick,
  onDismiss,
  onAction,
  reserveAction,
}: DeckPileProps) {
  const style = CARD_LEVEL_STYLES[level];
  const Component = onClick ? 'button' : 'div';
  const showOverlay = selected && selection && onDismiss && onAction;

  return (
    <div className="relative shrink-0">
      <Component
        type={onClick ? 'button' : undefined}
        onClick={onClick}
        disabled={count === 0}
        className={[
          'flex min-h-[88px] min-w-[52px] flex-col items-center justify-center rounded-lg border-2',
          style.border,
          'bg-slate-800',
          count === 0 ? 'opacity-40' : '',
          onClick && count > 0 ? 'active:scale-95' : '',
        ].join(' ')}
      >
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${style.header}`}>
          {style.label}
        </span>
        <span className="mt-1 text-lg font-bold text-slate-300">{count}</span>
        {onClick && count > 0 && (
          <span className="mt-0.5 text-[9px] text-slate-500">탭하여 예약</span>
        )}
      </Component>
      {showOverlay && (
        <CardActionOverlay
          showReserve
          showPurchase={false}
          reserveEnabled={!!reserveAction}
          purchaseEnabled={false}
          onReserve={() => reserveAction && onAction(reserveAction)}
          onPurchase={() => {}}
          onDismiss={onDismiss}
        />
      )}
    </div>
  );
}
