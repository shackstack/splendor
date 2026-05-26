import { CardLevelRow } from './CardLevelRow';
import { CARD_LEVELS } from '../../game/logic/constants';
import type { CardSelection } from '../../store/uiStore';
import type { GameState } from '../../types/game';

interface CardBoardProps {
  state: GameState;
  selectedCard: CardSelection | null;
  onSelectCard: (source: CardSelection) => void;
  interactive: boolean;
}

export function CardBoard({
  state,
  selectedCard,
  onSelectCard,
  interactive,
}: CardBoardProps) {
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
            interactive={interactive}
          />
        ))}
      </div>
    </section>
  );
}
