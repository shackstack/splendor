import { describe, expect, it } from 'vitest';

import { applyAction } from './apply-action';
import { getValidActions } from './valid-actions';
import { getHumanPlayer } from './state-access';
import { getTotalGemsInGame, makeTestCard, makeTestState } from '../../test/helpers';
import type { Action } from '../../types';

function findPurchaseAction(state: ReturnType<typeof makeTestState>): Extract<Action, { type: 'purchase_card' }> {
  const action = getValidActions(state, state.players[0].id).find(
    (candidate): candidate is Extract<Action, { type: 'purchase_card' }> => candidate.type === 'purchase_card',
  );
  if (!action) {
    throw new Error('구매 가능한 행동을 찾지 못했습니다.');
  }
  return action;
}

describe('applyAction', () => {
  it('보석 3개 가져오기 후 뱅크와 플레이어 보석 합계를 유지한다', () => {
    const state = makeTestState();
    const action: Action = { type: 'take_three_gems', gems: ['diamond', 'sapphire', 'ruby'] };
    const gemsBefore = getTotalGemsInGame(state);

    const nextState = applyAction(state, action);

    expect(getTotalGemsInGame(nextState)).toBe(gemsBefore);
    expect(nextState.players[0].gems).toEqual({
      diamond: 1,
      sapphire: 1,
      ruby: 1,
    });
    expect(nextState.gemBank.diamond).toBe((state.gemBank.diamond ?? 0) - 1);
  });

  it('카드 구매 후 purchasedCards가 증가하고 보드 슬롯을 리필한다', () => {
    const purchasedCard = makeTestCard({ id: 'buy-me', cost: { diamond: 1 }, bonus: 'sapphire' });
    const refillCard = makeTestCard({ id: 'refill-card', cost: { ruby: 2 }, bonus: 'emerald' });
    const base = makeTestState();
    const state = makeTestState({
      human: { gems: { diamond: 1 } },
      boardCard: purchasedCard,
      decks: {
        1: [refillCard],
        2: base.decks[2],
        3: base.decks[3],
      },
    });

    const action = findPurchaseAction(state);
    const nextState = applyAction(state, action);

    expect(nextState.players[0].purchasedCards).toHaveLength(1);
    expect(nextState.players[0].purchasedCards[0].id).toBe('buy-me');
    expect(nextState.players[0].score).toBe(0);
    expect(nextState.players[0].gems.diamond).toBeUndefined();
    expect(nextState.board[1][0].card?.id).toBe('refill-card');
    expect(nextState.gemBank.diamond).toBe((state.gemBank.diamond ?? 0) + 1);
  });

  it('카드 구매 후 새 state에서만 플레이어 상태가 갱신된다', () => {
    const state = makeTestState({
      human: { gems: { diamond: 1 } },
      boardCard: makeTestCard({ id: 'buy-me', cost: { diamond: 1 } }),
    });
    const staleHuman = getHumanPlayer(state);
    const action = findPurchaseAction(state);

    const nextState = applyAction(state, action);
    const freshHuman = getHumanPlayer(nextState);

    expect(staleHuman.purchasedCards).toHaveLength(0);
    expect(freshHuman.purchasedCards).toHaveLength(1);
    expect(staleHuman).not.toBe(freshHuman);
  });

  it('15점 도달 시 finalRoundTriggeredBy를 설정한다', () => {
    const highValueCard = makeTestCard({ id: 'win-card', points: 15, cost: { diamond: 1 } });
    const state = makeTestState({
      human: { gems: { diamond: 1 } },
      boardCard: highValueCard,
    });
    const action = findPurchaseAction(state);

    const nextState = applyAction(state, action);

    expect(nextState.players[0].score).toBe(15);
    expect(nextState.finalRoundTriggeredBy).toBe('player-0');
  });

  it('유효하지 않은 행동은 상태를 변경하지 않는다', () => {
    const state = makeTestState({
      human: { gems: {} },
      boardCard: makeTestCard({ cost: { diamond: 1 } }),
    });
    const invalidAction: Action = {
      type: 'purchase_card',
      source: { kind: 'board', level: 1, slotIndex: 0 },
      payment: { diamond: 1 },
    };

    const nextState = applyAction(state, invalidAction);

    expect(nextState.players[0].purchasedCards).toHaveLength(0);
    expect(nextState.board[1][0].card?.id).toBe(state.board[1][0].card?.id);
  });
});

describe('getValidActions', () => {
  it('현재 턴이 아닌 플레이어는 빈 배열을 반환한다', () => {
    const state = makeTestState();

    expect(getValidActions(state, 'player-1')).toEqual([]);
  });

  it('구매 가능한 카드가 있으면 purchase_card를 포함한다', () => {
    const state = makeTestState({
      human: { gems: { diamond: 1 } },
      boardCard: makeTestCard({ cost: { diamond: 1 } }),
    });

    const actions = getValidActions(state, 'player-0');

    expect(actions.some((action) => action.type === 'purchase_card')).toBe(true);
  });

  it('예약 카드가 3장이면 reserve_card를 포함하지 않는다', () => {
    const state = makeTestState({
      human: {
        reservedCards: [
          makeTestCard({ id: 'reserved-1' }),
          makeTestCard({ id: 'reserved-2' }),
          makeTestCard({ id: 'reserved-3' }),
        ],
      },
    });

    const actions = getValidActions(state, 'player-0');

    expect(actions.some((action) => action.type === 'reserve_card')).toBe(false);
  });
});

describe('getHumanPlayer', () => {
  it('현재 state의 인간 플레이어를 반환한다', () => {
    const state = makeTestState({
      human: { score: 3, purchasedCards: [makeTestCard({ id: 'owned' })] },
    });

    const human = getHumanPlayer(state);

    expect(human.id).toBe('player-0');
    expect(human.score).toBe(3);
    expect(human.purchasedCards[0].id).toBe('owned');
  });
});
