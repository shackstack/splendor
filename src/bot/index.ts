import { getValidActions } from '../game/logic';
import type { Action, BotLevel, GameState } from '../types/index';
import { greedyBotAction } from './greedy';
import { randomBotAction } from './random';

export function botAction(state: GameState, botId: string, level: BotLevel): Action {
  const actions = getValidActions(state, botId);
  if (actions.length === 0) {
    throw new Error(`No valid actions for bot: ${botId}`);
  }

  switch (level) {
    case 'random':
      return randomBotAction(actions);
    case 'greedy':
    case 'strategic':
      return greedyBotAction(state, botId, actions);
    default: {
      const exhaustive: never = level;
      throw new Error(`Unsupported bot level: ${exhaustive}`);
    }
  }
}
// 단위 테스트:
// random + valid actions -> getValidActions 결과 중 하나 반환
// greedy + 구매 가능 -> points最高的 purchase_card
// greedy + 구매 불가 + 1턴 후 구매 가능 보드 카드 -> reserve_card
// greedy + 그 외 -> 목표 카드 netCost에 맞는 보석 수집
// valid actions 없음 -> Error
