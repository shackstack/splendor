import { describe, expect, it } from 'vitest';

import { initGame } from './setup';
import { BOARD_SLOTS_PER_LEVEL, MAX_PLAYERS, MIN_PLAYERS } from '../../types';
import { getGemBankSize } from './gems';

describe('initGame', () => {
  it('2인 게임을 초기화한다', () => {
    const state = initGame(2);

    expect(state.players).toHaveLength(2);
    expect(state.phase).toBe('playing');
    expect(state.turnNumber).toBe(1);
    expect(state.nobles).toHaveLength(3);
    expect(state.currentPlayerIndex).toBe(0);
  });

  it('4인 게임의 보석 뱅크와 보드 슬롯을 설정한다', () => {
    const state = initGame(4);

    expect(getGemBankSize(4)).toBe(7);
    expect(state.gemBank.baekok).toBe(7);
    expect(state.board[1]).toHaveLength(BOARD_SLOTS_PER_LEVEL);
  });

  it('허용되지 않은 인원 수면 에러를 던진다', () => {
    expect(() => initGame(MIN_PLAYERS - 1)).toThrow(/playerCount must be between/);
    expect(() => initGame(MAX_PLAYERS + 1)).toThrow(/playerCount must be between/);
  });
});
