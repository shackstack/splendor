import { useCallback } from 'react';

import { ActionBar } from '../actions/ActionBar';
import { CardBoard } from '../board/CardBoard';
import { GemBank } from '../gems/GemBank';
import { NobleRow } from '../board/NobleRow';
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
  const state        = useGameStore((s) => s.state)!;
  const playerAction = useGameStore((s) => s.playerAction);
  const reset        = useGameStore((s) => s.reset);

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
    <div className="relative flex h-dvh w-full max-w-full flex-col overflow-hidden">

      {/* ── 가로 모드 전용: 세로 모드 회전 안내 ─────────────────── */}
      <div className="absolute inset-0 z-50 hidden flex-col items-center justify-center gap-4 bg-slate-950 portrait:flex">
        <div
          className="text-6xl"
          style={{ textShadow: '0 0 24px rgba(167,139,250,0.6)' }}
        >
          ↻
        </div>
        <p className="text-base font-bold text-white">화면을 가로로 돌려주세요</p>
        <p className="text-sm text-slate-400">이 게임은 가로 모드 전용입니다</p>
        <div className="mt-2 flex gap-1.5 text-lg">
          <span>木</span><span>火</span><span>土</span><span>金</span><span>水</span>
        </div>
      </div>

      {/* ── 최후의 소환식 알림 띠 (final_round만) ────────────── */}
      {state.phase === 'final_round' && (
        <div className="shrink-0 bg-rose-500/20 py-0.5 text-center text-[10px] font-semibold text-rose-300">
          ⚠ 최후의 소환식 — {state.turnNumber}번째
        </div>
      )}

      {/* ── 메인 영역: 3열 레이아웃 ───────────────────────────── */}
      <div className="flex min-h-0 min-w-0 flex-1 gap-1.5 p-1.5">

        {/* 좌열: 봇 레일 */}
        <div className="flex w-[112px] shrink-0 flex-col">
          <PlayerRail
            player={bot}
            isActive={!isHumanTurn && state.phase !== 'finished'}
            selectedCard={null}
            interactive={false}
          />
        </div>

        {/* 중앙열: (저장고 + 신수) 같은 행 → 카드 보드 (스크롤) */}
        <div className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            {/* 저장고 + 신수 같은 행 */}
            <div className="grid grid-cols-[auto_1fr] gap-1.5">
              <GemBank gems={state.gemBank} compact />
              <NobleRow nobles={state.nobles} compact />
            </div>
            <CardBoard
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

        {/* 우열: 내 플레이어 레일 */}
        <div className="flex w-[112px] shrink-0 flex-col">
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
      </div>

      {/* ── 액션 바 (내 턴일 때만) ────────────────────────────── */}
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

      {/* ── 플레이어 상세 모달 ──────────────────────────────── */}
      {detailPlayer && (
        <PlayerDetailModal
          player={detailPlayer}
          isOpen={true}
          onClose={closeDetailModal}
        />
      )}

      {/* ── 게임 종료 모달 ──────────────────────────────────── */}
      {state.phase === 'finished' && (
        <GameOverModal state={state} humanId={human.id} onRestart={handleRestart} />
      )}
    </div>
  );
}
