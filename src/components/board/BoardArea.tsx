import { CardBoard } from './CardBoard';
import { GemBank } from '../gems/GemBank';
import { NobleRow } from './NobleRow';
import type { CardSelection } from '../../store/uiStore';
import type { Action, GameState } from '../../types';

interface BoardAreaProps {
  state: GameState;
  selectedCard: CardSelection | null;
  onSelectCard: (source: CardSelection) => void;
  onDismissCard: () => void;
  onAction: (action: Action) => void;
  getCardActions: (selection: CardSelection) => {
    reserveAction: Action | null;
    purchaseAction: Action | null;
  };
  interactive: boolean;
}

export function BoardArea({
  state,
  selectedCard,
  onSelectCard,
  onDismissCard,
  onAction,
  getCardActions,
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
        onDismissCard={onDismissCard}
        onAction={onAction}
        getCardActions={getCardActions}
        interactive={interactive}
      />
    </div>
  );
}
