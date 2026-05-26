import { ALL_NOBLES } from '../../data/nobles';
import type { GameState, Noble, PlayerState, RegularGemCounts } from '../../types/index';
import { REGULAR_GEM_TYPES } from '../../types/index';
import { cloneNoble, clonePlayer } from './clone';
import { getBonusCounts } from './player';
import { shuffle } from './utils';

export function meetsNobleRequirements(bonuses: RegularGemCounts, noble: Noble): boolean {
  return REGULAR_GEM_TYPES.every(
    (gem) => (bonuses[gem] ?? 0) >= (noble.requirements[gem] ?? 0),
  );
}

export function pickNobles(playerCount: number): Noble[] {
  return shuffle(ALL_NOBLES)
    .slice(0, playerCount + 1)
    .map(cloneNoble);
}

export function checkNobleVisit(state: GameState, playerId: string): Noble | null {
  const player = state.players.find((candidate) => candidate.id === playerId);
  if (!player) return null;

  const bonuses = getBonusCounts(player);
  const eligibleNoble = state.nobles.find((noble) => meetsNobleRequirements(bonuses, noble));
  return eligibleNoble ? cloneNoble(eligibleNoble) : null;
}
// 단위 테스트:
// 보너스가 mary-stuart 조건 충족 + nobles에 포함 -> mary-stuart 반환
// 조건 미충족 -> null
// 이미 모든 귀족 획득 후에도 board nobles 기준으로 판단

export function assignNobleIfEligible(state: GameState, playerIndex: number): GameState {
  const player = state.players[playerIndex];
  const noble = checkNobleVisit(state, player.id);
  if (!noble) return state;

  const nextNobles = state.nobles.filter((candidate) => candidate.id !== noble.id);
  const nextPlayer: PlayerState = {
    ...clonePlayer(player),
    nobles: [...player.nobles.map(cloneNoble), cloneNoble(noble)],
    score: player.score + noble.points,
  };

  return {
    ...state,
    nobles: nextNobles,
    players: state.players.map((current, index) => (index === playerIndex ? nextPlayer : clonePlayer(current))),
  };
}
