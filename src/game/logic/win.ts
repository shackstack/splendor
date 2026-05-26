import type { GamePhase, GameState } from '../../types/index';
import { getPlayerIndex } from './state-access';

export function determineWinners(state: GameState): string[] {
  const maxScore = Math.max(...state.players.map((player) => player.score));
  const topScorers = state.players.filter((player) => player.score === maxScore);

  if (topScorers.length === 1) {
    return [topScorers[0].id];
  }

  const minCards = Math.min(...topScorers.map((player) => player.purchasedCards.length));
  return topScorers
    .filter((player) => player.purchasedCards.length === minCards)
    .map((player) => player.id);
}

export function resolveWinnerId(state: GameState): string | null {
  const winners = state.winnerIds ?? determineWinners(state);
  return winners[0] ?? null;
}

export function checkWinCondition(state: GameState): string | null {
  if (state.phase !== 'finished') return null;
  return resolveWinnerId(state);
}
// 단위 테스트:
// phase === 'playing' -> null
// phase === 'finished', 단독 1위 -> 해당 player id
// phase === 'finished', 동점 + 카드 수 적은 플레이어 승리

export function advanceTurn(state: GameState, actorIndex: number): GameState {
  const playerCount = state.players.length;
  const nextIndex = (actorIndex + 1) % playerCount;
  let phase: GamePhase = state.phase;

  if (state.finalRoundTriggeredBy) {
    const triggerIndex = getPlayerIndex(state, state.finalRoundTriggeredBy);
    if (phase === 'playing') {
      phase = 'final_round';
    } else if (phase === 'final_round' && nextIndex === triggerIndex) {
      const winnerIds = determineWinners(state);
      return {
        ...state,
        phase: 'finished',
        currentPlayerIndex: nextIndex,
        turnNumber: state.turnNumber + 1,
        winnerIds,
      };
    }
  }

  return {
    ...state,
    phase,
    currentPlayerIndex: nextIndex,
    turnNumber: state.turnNumber + 1,
  };
}
