import { CardTile } from '../cards/CardTile';
import { BonusSummary } from './BonusSummary';
import { GemHand } from '../gems/GemHand';
import { PlayerSummary } from './PlayerSummary';
import { ReservedCards } from './ReservedCards';
import type { CardSelection } from '../../store/uiStore';
import type { Action } from '../../types';
import type { Card } from '../../types/card';
import type { PlayerState } from '../../types/player';

interface PlayerPanelProps {
  player: PlayerState;
  isActive: boolean;
  selectedCard: CardSelection | null;
  onSelectCard: (source: CardSelection) => void;
  onDismissCard?: () => void;
  onAction?: (action: Action) => void;
  getCardActions?: (selection: CardSelection) => {
    reserveAction: Action | null;
    purchaseAction: Action | null;
  };
  canAffordCard?: (card: Card) => boolean;
  interactive: boolean;
}

export function PlayerPanel({
  player,
  isActive,
  selectedCard,
  onSelectCard,
  onDismissCard,
  onAction,
  getCardActions,
  canAffordCard,
  interactive,
}: PlayerPanelProps) {
  return (
    <section className="rounded-xl border border-slate-600 bg-slate-800 p-3 shadow-lg">
      <PlayerSummary player={player} isActive={isActive} />

      <div className="mt-3 space-y-3">
        <div>
          <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            보석
          </h3>
          <GemHand gems={player.gems} />
        </div>

        <div>
          <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            보너스
          </h3>
          <BonusSummary player={player} />
        </div>

        <div>
          <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            예약 카드
          </h3>
          <ReservedCards
            cards={player.reservedCards}
            selectedCard={selectedCard}
            onSelectCard={onSelectCard}
            onDismiss={onDismissCard}
            onAction={onAction}
            getCardActions={getCardActions}
            canAffordCard={canAffordCard}
            interactive={interactive}
          />
        </div>

        {player.purchasedCards.length > 0 && (
          <div>
            <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              구매 카드 ({player.purchasedCards.length})
            </h3>
            <div className="flex gap-1 overflow-x-auto pb-1">
              {player.purchasedCards.slice(-6).map((card, index) => (
                <div key={`${card.id}-${index}`} className="w-[56px] shrink-0 scale-90">
                  <CardTile card={card} compact />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
