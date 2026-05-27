import { BonusSummary } from "./BonusSummary";
import { GemHand } from "../gems/GemHand";
import { OwnedNobles } from "./OwnedNobles";
import { PlayerSummary } from "./PlayerSummary";
import { PurchasedCards } from "./PurchasedCards";
import { ReservedCards } from "./ReservedCards";
import type { CardSelection } from "../../store/uiStore";
import type { Action } from "../../types";
import type { Card } from "../../types/card";
import type { RegularGemCounts } from "../../types/gems";
import type { PlayerState } from "../../types/player";

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
  playerBonuses?: RegularGemCounts;
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
  playerBonuses,
  interactive,
}: PlayerPanelProps) {
  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-3 shadow-lg backdrop-blur-sm">
      <PlayerSummary player={player} isActive={isActive} />

      <div className="mt-3 space-y-3">
        <div>
          <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            정령석
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
            예약 정령
          </h3>
          <ReservedCards
            cards={player.reservedCards}
            selectedCard={selectedCard}
            onSelectCard={onSelectCard}
            onDismiss={onDismissCard}
            onAction={onAction}
            getCardActions={getCardActions}
            canAffordCard={canAffordCard}
            playerBonuses={playerBonuses}
            interactive={interactive}
          />
        </div>

        {player.nobles.length > 0 && (
          <div>
            <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              소환 신수 ({player.nobles.length})
            </h3>
            <OwnedNobles nobles={player.nobles} />
          </div>
        )}

        {player.purchasedCards.length > 0 && (
          <div>
            <h3 className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              소환 정령 ({player.purchasedCards.length})
            </h3>
            <PurchasedCards cards={player.purchasedCards} />
          </div>
        )}
      </div>
    </section>
  );
}
