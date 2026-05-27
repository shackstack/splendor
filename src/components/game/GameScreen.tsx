import { useCallback } from 'react';

import { ActionBar } from '../actions/ActionBar';
import { BoardArea } from '../board/BoardArea';
import { GameHeader } from './GameHeader';
import { GameOverModal } from '../overlays/GameOverModal';
import { PlayerRail } from '../player/PlayerRail';
import { PlayerDetailModal } from '../player/PlayerDetailModal';
import { getHumanPlayer } from '../../game/logic/state-access';
import { getBonusCounts } from '../../game/logic/player';
import { useGameStore } from '../../store/gameStore';
import { useUiStore } from '../../store/uiStore';
import { getCardActions } from '../../utils/cardActions';
import { canAffordCard as checkCanAffordCard } from '../../utils/cardAffordability';
import type { Action } from '../../types';
import type { Card } from '../../types/card';
import type { CardSelection } from '../../store/uiStore';

export function GameScreen() {
  const state      = useGameStore((s) => s.state)!;
  const playerAction = useGameStore((s) => s.playerAction);
  const reset      = useGameStore((s) => s.reset);

  const selectedGems        = useUiStore((s) => s.selectedGems);
  const selectedCard        = useUiStore((s) => s.selectedCard);
  const detailPlayer        = useUiStore((s) => s.detailPlayer);
  const addGemToBasket      = useUiStore((s) => s.addGemToBasket);
  const removeGemFromBasket = useUiStore((s) => s.removeGemFromBasket);
  const clearGems           = useUiStore((s) => s.clearGems);
  const selectCard          = useUiStore((s) => s.selectCard);
  const closeDetailModal    = useUiStore((s) => s.closeDetailModal);
  const resetUi             = useUiStore((s) => s.reset);

  const human        = getHumanPlayer(state);
  const humanBonuses = getBonusCounts(human);
  const bot          = state.players.find((p) => p.isBot)!;
  const isHumanTurn  =
    state.phase !== 'finished' &&
    state.players[state.currentPlayerIndex].id === human.id;

  const handleAction = useCallback(
    (action: Action) => { playerAction(action); resetUi(); },
    [playerAction, resetUi],
  );

  const handleRestart = useCallback(() => {
    reset(); resetUi();
  }, [reset, resetUi]);

  const handleSelectCard = useCallback(
    (source: CardSelection) => {
      if (!isHumanTurn) return;
      selectCard(source);
      clearGems();
    },
    [isHumanTurn, selectCard, clearGems],
  );

  const handleDismissCard = useCallback(() => selectCard(null), [selectCard]);

  const handleAddGem = useCallback(
    (gem: Parameters<typeof addGemToBasket>[0]) =>
      addGemToBasket(gem, state.gemBank),
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
    /* 전체 화면 고정 — 스크롤 없음 */
    <div className="flex h-dvh flex-col overflow-hidden">

      {/* ── 헤더 ──────────────────────────────────────────── */}
      <div className="shrink-0 border-b border-slate-700/50 px-3 py-2">
        <GameHeader
          turnNumber={state.turnNumber}
          phase={state.phase}
          isHumanTurn={isHumanTurn}
          humanScore={human.score}
          botScore={bot.score}
        />
      </div>

      {/* ── 메인 영역: 플레이어 레일(좌) + 보드(우) ─────── */}
      <div className="flex min-h-0 flex-1 gap-2 p-2">

        {/* 좌: 플레이어 레일 2개 */}
        <div className="flex w-[110px] shrink-0 flex-col gap-2">
          {/* 봇 레일 */}
          <PlayerRail
            player={bot}
            isActive={!isHumanTurn && state.phase !== 'finished'}
            selectedCard={null}
            interactive={false}
          />
          {/* 내 레일 */}
          <PlayerRail
            player={human}
            isActive={isHumanTurn}
            selectedCard={selectedCard}
            onSelectCard={handleSelectCard}
            onDismissCard={handleDismissCard}
            onAction={handleAction}
            getCardActions={resolveCardActions}
            canAffordCard={canAffordCard}
            playerBonuses={humanBonuses}
            interactive={isHumanTurn}
            showReserved
          />
        </div>

        {/* 우: 보드 (내부 스크롤) */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <BoardArea
            state={state}
            selectedCard={selectedCard}
            onSelectCard={handleSelectCard}
            onDismissCard={handleDismissCard}
            onAction={handleAction}
            getCardActions={resolveCardActions}
            canAffordCard={canAffordCard}
            playerBonuses={humanBonuses}
            interactive={isHumanTurn}
          />
        </div>
      </div>

      {/* ── 액션 바 (내 턴일 때만) ──────────────────────── */}
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

      {/* ── 플레이어 상세 모달 ──────────────────────────── */}
      {detailPlayer && (
        <PlayerDetailModal
          player={detailPlayer}
          isOpen={true}
          onClose={closeDetailModal}
        />
      )}

      {/* ── 게임 종료 모달 ──────────────────────────────── */}
      {state.phase === 'finished' && (
        <GameOverModal state={state} humanId={human.id} onRestart={handleRestart} />
      )}
    </div>
  );
}
