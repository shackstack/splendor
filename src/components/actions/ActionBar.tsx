import { useCallback, useMemo } from 'react';

import { GemPicker } from '../gems/GemPicker';
import { getValidActions } from '../../game/logic';
import { getTotalGemCount } from '../../game/logic/gems';
import { buildGemActionFromSelection, getIncomingGemCount } from '../../utils/gemAction';
import { toast } from '../../utils/toast';
import type { Action, GameState } from '../../types';
import { MAX_GEMS_IN_HAND } from '../../types';
import type { RegularGemType } from '../../types/gems';
import type { PlayerState } from '../../types/player';

interface ActionBarProps {
  state: GameState;
  player: PlayerState;
  selectedGems: RegularGemType[];
  onAddGem: (gem: RegularGemType) => void;
  onRemoveGem: (index: number) => void;
  onClearGems: () => void;
  onAction: (action: Action) => void;
}

function findMatchingGemAction(actions: Action[], selectedGems: RegularGemType[]): Action | null {
  const selection = buildGemActionFromSelection(selectedGems);
  if (!selection) return null;

  if (selection.type === 'take_two_gems') {
    return (
      actions.find(
        (a) => a.type === 'take_two_gems' && a.gem === selection.gem,
      ) ?? null
    );
  }

  const sorted = [...selection.gems].sort().join(',');
  return (
    actions.find(
      (a) =>
        a.type === 'take_three_gems' &&
        [...a.gems].sort().join(',') === sorted,
    ) ?? null
  );
}

export function ActionBar({
  state,
  player,
  selectedGems,
  onAddGem,
  onRemoveGem,
  onClearGems,
  onAction,
}: ActionBarProps) {
  const validActions = useMemo(
    () => getValidActions(state, player.id),
    [state, player.id],
  );

  const selectionAction = buildGemActionFromSelection(selectedGems);
  const gemAction = findMatchingGemAction(validActions, selectedGems);

  const handleTakeGems = useCallback(() => {
    if (gemAction) {
      onAction(gemAction);
      return;
    }

    if (!selectionAction) return;

    const incoming = getIncomingGemCount(selectionAction);
    if (getTotalGemCount(player.gems) + incoming > MAX_GEMS_IN_HAND) {
      toast({
        message: '정령석은 최대 10개까지 보유할 수 있습니다',
        type: 'error',
      });
    }
  }, [gemAction, onAction, player.gems, selectionAction]);

  return (
    /* 가로 모드 최적화: 단일 행 컴팩트 레이아웃 */
    <section className="min-w-0 shrink-0 overflow-hidden border-t border-slate-700/60 bg-slate-950/95 px-3 py-2 backdrop-blur">
      <div className="flex min-w-0 items-center gap-3">
        {/* 정령석 선택 + 바구니 (한 줄) */}
        <GemPicker
          compact
          bank={state.gemBank}
          selectedGems={selectedGems}
          onAddGem={onAddGem}
          onRemoveGem={onRemoveGem}
          onClear={onClearGems}
        />

        {/* 가져오기 버튼 */}
        <button
          type="button"
          disabled={!selectionAction}
          onClick={handleTakeGems}
          className={[
            'shrink-0 rounded-lg px-4 py-2 text-sm font-semibold text-white',
            'bg-violet-700 disabled:opacity-40 active:bg-violet-800',
            'transition-colors',
          ].join(' ')}
        >
          가져오기
        </button>
      </div>
    </section>
  );
}
