import { useCallback } from 'react';

import { ActionBar } from '../actions/ActionBar';
import { BoardArea } from '../board/BoardArea';
import { GameHeader } from './GameHeader';
import { GameOverModal } from '../overlays/GameOverModal';
import { PlayerPanel } from '../player/PlayerPanel';
import { getHumanPlayer } from '../../game/logic/state-access';
import { useGameStore } from '../../store/gameStore';
import { useUiStore } from '../../store/uiStore';
import { getCardActions } from '../../utils/cardActions';
import { canAffordCard as checkCanAffordCard } from '../../utils/cardAffordability';
import type { Action } from '../../types';
import type { Card } from '../../types/card';
import type { CardSelection } from '../../store/uiStore';

export function GameScreen() {
  const state = useGameStore((s) => s.state)!;
  const playerAction = useGameStore((s) => s.playerAction);
  const reset = useGameStore((s) => s.reset);

  const selectedGems = useUiStore((s) => s.selectedGems);
  const selectedCard = useUiStore((s) => s.selectedCard);
  const addGemToBasket = useUiStore((s) => s.addGemToBasket);
  const removeGemFromBasket = useUiStore((s) => s.removeGemFromBasket);
  const clearGems = useUiStore((s) => s.clearGems);
  const selectCard = useUiStore((s) => s.selectCard);
  const resetUi = useUiStore((s) => s.reset);

  const human = getHumanPlayer(state);
  const bot = state.players.find((p) => p.isBot)!;
  const isHumanTurn =
    state.phase !== 'finished' && state.players[state.currentPlayerIndex].id === human.id;

  const handleAction = useCallback(
    (action: Action) => {
      playerAction(action);
      resetUi();
    },
    [playerAction, resetUi],
  );

  const handleRestart = useCallback(() => {
    reset();
    resetUi();
  }, [reset, resetUi]);

  const handleSelectCard = useCallback(
    (source: CardSelection) => {
      if (!isHumanTurn) return;
      selectCard(source);
      clearGems();
    },
    [isHumanTurn, selectCard, clearGems],
  );

  const handleDismissCard = useCallback(() => {
    selectCard(null);
  }, [selectCard]);

  const handleAddGem = useCallback(
    (gem: Parameters<typeof addGemToBasket>[0]) => {
      addGemToBasket(gem, state.gemBank);
    },
    [addGemToBasket, state.gemBank],
  );

  const resolveCardActions = useCallback(
    (selection: CardSelection) => getCardActions(state, human.id, selection),
    [state, human.id],
  );

  const canAffordCard = useCallback(
    (card: Card) => checkCanAffordCard(human, card),
    [human],
  );

  return (
    <div className="flex min-h-dvh flex-col">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4 pb-2">
        <GameHeader
          turnNumber={state.turnNumber}
          phase={state.phase}
          isHumanTurn={isHumanTurn}
          humanScore={human.score}
          botScore={bot.score}
        />

        <PlayerPanel
          player={bot}
          isActive={!isHumanTurn && state.phase !== 'finished'}
          selectedCard={null}
          onSelectCard={() => {}}
          interactive={false}
        />

        <BoardArea
          state={state}
          selectedCard={selectedCard}
          onSelectCard={handleSelectCard}
          onDismissCard={handleDismissCard}
          onAction={handleAction}
          getCardActions={resolveCardActions}
          canAffordCard={canAffordCard}
          interactive={isHumanTurn}
        />

        <PlayerPanel
          player={human}
          isActive={isHumanTurn}
          selectedCard={selectedCard}
          onSelectCard={handleSelectCard}
          onDismissCard={handleDismissCard}
          onAction={handleAction}
          getCardActions={resolveCardActions}
          canAffordCard={canAffordCard}
          interactive={isHumanTurn}
        />
      </div>

      {isHumanTurn && (
        <ActionBar
          state={state}
          player={human}
          selectedGems={selectedGems}
          onAddGem={handleAddGem}
          onRemoveGem={removeGemFromBasket}
          onClearGems={clearGems}
          onAction={handleAction}
        />
      )}

      {state.phase === 'finished' && (
        <GameOverModal state={state} humanId={human.id} onRestart={handleRestart} />
      )}
    </div>
  );
}
