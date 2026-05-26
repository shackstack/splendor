import { CardBoard } from './CardBoard';
import { GemBank } from '../gems/GemBank';
import { NobleRow } from './NobleRow';
import type { CardSelection } from '../../store/uiStore';
import type { GameState } from '../../types/game';

interface BoardAreaProps {
  state: GameState;
  selectedCard: CardSelection | null;
  onSelectCard: (source: CardSelection) => void;
  interactive: boolean;
}

export function BoardArea({
  state,
  selectedCard,
  onSelectCard,
  interactive,
}: BoardAreaProps) {
  return (
    <div className="flex flex-col gap-3">
      <GemBank gems={state.gemBank} />
      <NobleRow nobles={state.nobles} />
      <CardBoard
        state={state}
        selectedCard={selectedCard}
        onSelectCard={onSelectCard}
        interactive={interactive}
      />
    </div>
  );
}
