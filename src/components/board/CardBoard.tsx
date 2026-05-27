import { CardLevelRow } from './CardLevelRow';
import { CARD_LEVELS } from '../../game/logic/constants';
import type { CardSelection } from '../../store/uiStore';
import type { Action, GameState } from '../../types';
import type { Card } from '../../types/card';
import type { RegularGemCounts } from '../../types/gems';

interface CardBoardProps {
  state: GameState;
  selectedCard: CardSelection | null;
  onSelectCard: (source: CardSelection) => void;
  onDismissCard: () => void;
  onAction: (action: Action) => void;
  getCardActions: (selection: CardSelection) => {
    reserveAction: Action | null;
    purchaseAction: Action | null;
  };
  canAffordCard?: (card: Card) => boolean;
  playerBonuses?: RegularGemCounts;
  interactive: boolean;
  /** 가로 모드 게임 화면: 남은 높이에 카드 행 균등 배치 */
  compact?: boolean;
}

export function CardBoard({
  state,
  selectedCard,
  onSelectCard,
  onDismissCard,
  onAction,
  getCardActions,
  canAffordCard,
  playerBonuses,
  interactive,
  compact,
}: CardBoardProps) {
  if (compact) {
    return (
      <section className="mt-1.5 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-800/80 p-1.5">
        <div className="flex min-h-0 flex-1 flex-col gap-1">
          {[...CARD_LEVELS].reverse().map((level) => (
            <CardLevelRow
              key={level}
              compact
              level={level}
              slots={state.board[level]}
              deckCount={state.decks[level].length}
              selectedCard={selectedCard}
              onSelectCard={onSelectCard}
              onDismiss={onDismissCard}
              onAction={onAction}
              getCardActions={getCardActions}
              canAffordCard={canAffordCard}
              playerBonuses={playerBonuses}
              interactive={interactive}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-800/80 p-3">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        공개 카드
      </h2>
      <div className="flex flex-col gap-4">
        {[...CARD_LEVELS].reverse().map((level) => (
          <CardLevelRow
            key={level}
            level={level}
            slots={state.board[level]}
            deckCount={state.decks[level].length}
            selectedCard={selectedCard}
            onSelectCard={onSelectCard}
            onDismiss={onDismissCard}
            onAction={onAction}
            getCardActions={getCardActions}
            canAffordCard={canAffordCard}
            playerBonuses={playerBonuses}
            interactive={interactive}
          />
        ))}
      </div>
    </section>
  );
}
