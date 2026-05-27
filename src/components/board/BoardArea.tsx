import { CardBoard } from './CardBoard';
import { GemBank } from '../gems/GemBank';
import { NobleRow } from './NobleRow';
import type { CardSelection } from '../../store/uiStore';
import type { Action, GameState } from '../../types';
import type { Card } from '../../types/card';
import type { RegularGemCounts } from '../../types/gems';

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
  canAffordCard?: (card: Card) => boolean;
  playerBonuses?: RegularGemCounts;
  interactive: boolean;
}

export function BoardArea({
  state,
  selectedCard,
  onSelectCard,
  onDismissCard,
  onAction,
  getCardActions,
  canAffordCard,
  playerBonuses,
  interactive,
}: BoardAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      <GemBank gems={state.gemBank} />
      <NobleRow nobles={state.nobles} />
      <CardBoard
        state={state}
        selectedCard={selectedCard}
        onSelectCard={onSelectCard}
        onDismissCard={onDismissCard}
        onAction={onAction}
        getCardActions={getCardActions}
        canAffordCard={canAffordCard}
        playerBonuses={playerBonuses}
        interactive={interactive}
      />
    </div>
  );
}
