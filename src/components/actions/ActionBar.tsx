import { useMemo } from 'react';

import { GemPicker } from '../gems/GemPicker';
import { getValidActions } from '../../game/logic';
import { getBoardCard } from '../../game/logic/board';
import type { CardSelection } from '../../store/uiStore';
import type { Action, GameState } from '../../types';
import type { RegularGemType } from '../../types/gems';
import type { PlayerState } from '../../types/player';

interface ActionBarProps {
  state: GameState;
  player: PlayerState;
  selectedGems: RegularGemType[];
  selectedCard: CardSelection | null;
  onToggleGem: (gem: RegularGemType) => void;
  onClearGems: () => void;
  onClearCard: () => void;
  onAction: (action: Action) => void;
}

function findMatchingGemAction(actions: Action[], selectedGems: RegularGemType[]): Action | null {
  if (selectedGems.length === 0) return null;

  const unique = new Set(selectedGems);
  if (unique.size !== selectedGems.length) {
    if (selectedGems.length === 2 && selectedGems[0] === selectedGems[1]) {
      return (
        actions.find(
          (a) => a.type === 'take_two_gems' && a.gem === selectedGems[0],
        ) ?? null
      );
    }
    return null;
  }

  const sorted = [...selectedGems].sort();
  return (
    actions.find(
      (a) =>
        a.type === 'take_three_gems' &&
        [...a.gems].sort().join(',') === sorted.join(','),
    ) ?? null
  );
}

function findReserveAction(
  actions: Action[],
  selectedCard: CardSelection,
): Action | null {
  if (selectedCard.kind === 'deck') {
    return (
      actions.find(
        (a) =>
          a.type === 'reserve_card' &&
          a.source.kind === 'deck' &&
          a.source.level === selectedCard.level,
      ) ?? null
    );
  }

  if (selectedCard.kind === 'board') {
    return (
      actions.find(
        (a) =>
          a.type === 'reserve_card' &&
          a.source.kind === 'board' &&
          a.source.level === selectedCard.level &&
          a.source.slotIndex === selectedCard.slotIndex,
      ) ?? null
    );
  }

  return null;
}

function findPurchaseAction(
  actions: Action[],
  selectedCard: CardSelection,
): Action | null {
  if (selectedCard.kind === 'board') {
    return (
      actions.find(
        (a) =>
          a.type === 'purchase_card' &&
          a.source.kind === 'board' &&
          a.source.level === selectedCard.level &&
          a.source.slotIndex === selectedCard.slotIndex,
      ) ?? null
    );
  }

  if (selectedCard.kind === 'reserved') {
    return (
      actions.find(
        (a) =>
          a.type === 'purchase_card' &&
          a.source.kind === 'reserved' &&
          a.source.index === selectedCard.index,
      ) ?? null
    );
  }

  return null;
}

export function ActionBar({
  state,
  player,
  selectedGems,
  selectedCard,
  onToggleGem,
  onClearGems,
  onClearCard,
  onAction,
}: ActionBarProps) {
  const validActions = useMemo(
    () => getValidActions(state, player.id),
    [state, player.id],
  );

  const gemAction = findMatchingGemAction(validActions, selectedGems);
  const reserveAction = selectedCard ? findReserveAction(validActions, selectedCard) : null;
  const purchaseAction = selectedCard ? findPurchaseAction(validActions, selectedCard) : null;

  const selectedCardLabel = useMemo(() => {
    if (!selectedCard) return null;
    if (selectedCard.kind === 'deck') {
      return `${selectedCard.level}등급 덱`;
    }
    if (selectedCard.kind === 'reserved') {
      const card = player.reservedCards[selectedCard.index];
      return card ? `예약: ${card.level}등급 ${card.points}pt` : '예약 카드';
    }
    const card = getBoardCard(state, selectedCard);
    return card ? `${card.level}등급 ${card.points}pt` : '보드 카드';
  }, [selectedCard, state, player.reservedCards]);

  return (
    <section className="border-t border-slate-700 bg-slate-900/95 p-4 backdrop-blur">
      <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
        행동 선택
      </h2>

      <GemPicker
        bank={state.gemBank}
        selectedGems={selectedGems}
        onToggleGem={onToggleGem}
        onClear={onClearGems}
      />

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          disabled={!gemAction}
          onClick={() => gemAction && onAction(gemAction)}
          className="min-h-11 flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40 active:bg-blue-700"
        >
          보석 가져오기
        </button>
      </div>

      {selectedCard && (
        <div className="mt-3 rounded-lg border border-slate-600 bg-slate-800 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-slate-300">선택: {selectedCardLabel}</p>
            <button
              type="button"
              onClick={onClearCard}
              className="text-xs text-slate-400 hover:text-white"
            >
              취소
            </button>
          </div>
          <div className="flex gap-2">
            {selectedCard.kind !== 'reserved' && (
              <button
                type="button"
                disabled={!reserveAction}
                onClick={() => reserveAction && onAction(reserveAction)}
                className="min-h-11 flex-1 rounded-lg bg-purple-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40 active:bg-purple-700"
              >
                예약
              </button>
            )}
            {selectedCard.kind !== 'deck' && (
              <button
                type="button"
                disabled={!purchaseAction}
                onClick={() => purchaseAction && onAction(purchaseAction)}
                className="min-h-11 flex-1 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white disabled:opacity-40 active:bg-emerald-700"
              >
                구매
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
