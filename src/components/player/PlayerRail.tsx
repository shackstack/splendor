import { GemHand } from '../gems/GemHand';
import { GemChip } from '../gems/GemChip';
import { ReservedCards } from './ReservedCards';
import { PointValue } from '../points/PointValue';
import { getBonusCounts } from '../../game/logic/player';
import { openPlayerDetailModal } from '../../utils/playerDetailModal';
import { REGULAR_GEM_TYPES } from '../../types/gems';
import type { CardSelection } from '../../store/uiStore';
import type { Action } from '../../types';
import type { Card } from '../../types/card';
import type { RegularGemCounts } from '../../types/gems';
import type { PlayerState } from '../../types/player';

interface PlayerRailProps {
  player: PlayerState;
  isActive: boolean;
  selectedCard: CardSelection | null;
  onSelectCard?: (source: CardSelection) => void;
  onDismissCard?: () => void;
  onAction?: (action: Action) => void;
  getCardActions?: (selection: CardSelection) => {
    reserveAction: Action | null;
    purchaseAction: Action | null;
  };
  canAffordCard?: (card: Card) => boolean;
  playerBonuses?: RegularGemCounts;
  interactive?: boolean;
  showReserved?: boolean;
}

export function PlayerRail({
  player,
  isActive,
  selectedCard,
  onSelectCard,
  onDismissCard,
  onAction,
  getCardActions,
  canAffordCard,
  playerBonuses,
  interactive = false,
  showReserved = false,
}: PlayerRailProps) {
  const bonuses = getBonusCounts(player);
  const ownedBonuses = REGULAR_GEM_TYPES.filter((gem) => (bonuses[gem] ?? 0) > 0);
  const hasDetail =
    player.purchasedCards.length > 0 ||
    player.nobles.length > 0 ||
    player.reservedCards.length > 0;

  return (
    <aside
      className={[
        'flex flex-1 flex-col gap-1.5 overflow-hidden rounded-xl border p-2 shadow-md',
        isActive
          ? 'border-amber-500/50 bg-slate-900/80'
          : 'border-slate-700/50 bg-slate-900/60',
      ].join(' ')}
    >
      {/* 이름 + 턴 뱃지 */}
      <div className="flex items-center justify-between gap-1">
        <span
          className={[
            'truncate text-[11px] font-bold',
            isActive ? 'text-amber-300' : 'text-slate-300',
          ].join(' ')}
        >
          {player.name}
        </span>
        {isActive && (
          <span className="shrink-0 rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-semibold text-amber-400">
            턴
          </span>
        )}
      </div>

      {/* 점수 + 카드·신수 수 */}
      <div className="flex items-center justify-between gap-1">
        <PointValue
          value={player.score}
          className="text-sm font-bold text-white"
          iconClassName="size-3 text-amber-300"
          hideZero={false}
        />
        <div className="flex gap-1.5 text-[9px] text-slate-500">
          <span>정령 {player.purchasedCards.length}</span>
          <span>신수 {player.nobles.length}</span>
        </div>
      </div>

      <div className="h-px shrink-0 bg-slate-700/40" />

      {/* 정령석 */}
      <div className="shrink-0">
        <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
          정령석
        </p>
        <GemHand gems={player.gems} />
      </div>

      {/* 보너스 */}
      {ownedBonuses.length > 0 && (
        <div className="shrink-0">
          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
            보너스
          </p>
          <div className="flex flex-wrap gap-0.5">
            {ownedBonuses.map((gem) => (
              <GemChip key={gem} gem={gem} count={bonuses[gem] ?? 0} size="sm" />
            ))}
          </div>
        </div>
      )}

      {/* 예약 정령 (내 레일) */}
      {showReserved && player.reservedCards.length > 0 && (
        <div className="min-h-0 flex-1 overflow-hidden">
          <p className="mb-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-500">
            예약 ({player.reservedCards.length})
          </p>
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
      )}

      {/* 봇: 예약 카드 수만 표시 */}
      {!showReserved && player.reservedCards.length > 0 && (
        <p className="text-[10px] text-slate-400">
          예약 {player.reservedCards.length}
        </p>
      )}

      {/* 상세 보기 */}
      {hasDetail && (
        <button
          type="button"
          onClick={() => openPlayerDetailModal(player)}
          className="mt-auto shrink-0 rounded-lg border border-slate-600/60 bg-slate-800/60 py-1 text-[10px] font-semibold text-slate-300 active:bg-slate-700"
        >
          상세 보기
        </button>
      )}
    </aside>
  );
}
