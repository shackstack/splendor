import { describe, expect, it } from 'vitest';

import { advanceTurn } from './win';
import { applyAction } from './apply-action';
import { getValidActions } from './valid-actions';
import { makeTestState } from '../../test/helpers';
import type { Action } from '../../types';

function firstTakeThreeAction(state: ReturnType<typeof makeTestState>): Extract<Action, { type: 'take_three_gems' }> {
  const action = getValidActions(state, state.players[state.currentPlayerIndex].id).find(
    (candidate): candidate is Extract<Action, { type: 'take_three_gems' }> => candidate.type === 'take_three_gems',
  );
  if (!action) {
    throw new Error('보석 3개 가져가기 행동을 찾지 못했습니다.');
  }
  return action;
}

describe('advanceTurn', () => {
  it('플레이어 행동마다가 아니라 한 라운드가 끝날 때만 turnNumber를 올린다', () => {
    const state = makeTestState();

    const afterFirstPlayer = applyAction(state, firstTakeThreeAction(state));
    expect(afterFirstPlayer.turnNumber).toBe(1);
    expect(afterFirstPlayer.currentPlayerIndex).toBe(1);

    const afterSecondPlayer = applyAction(afterFirstPlayer, firstTakeThreeAction(afterFirstPlayer));
    expect(afterSecondPlayer.turnNumber).toBe(2);
    expect(afterSecondPlayer.currentPlayerIndex).toBe(0);
  });

  it('3인 이상 게임에서도 마지막 플레이어 행동 후에만 turnNumber를 올린다', () => {
    const base = makeTestState();
    const state = {
      ...base,
      players: [
        base.players[0],
        base.players[1],
        { ...base.players[1], id: 'player-2', name: 'Bot 2' },
      ],
    };

    let current = applyAction(state, firstTakeThreeAction(state));
    expect(current.turnNumber).toBe(1);

    current = applyAction(current, firstTakeThreeAction(current));
    expect(current.turnNumber).toBe(1);

    current = applyAction(current, firstTakeThreeAction(current));
    expect(current.turnNumber).toBe(2);
  });

  it('advanceTurn은 마지막 플레이어가 행동했을 때만 turnNumber를 올린다', () => {
    const state = makeTestState();

    expect(advanceTurn(state, 0).turnNumber).toBe(1);
    expect(advanceTurn(state, 1).turnNumber).toBe(2);
  });
});
