import type { CardSource, GameState, PlayerState } from '../../types/index';
import { clonePlayer } from './clone';
import { getBoardCard } from './board';

export function getPlayerIndex(state: GameState, playerId: string): number {
  return state.players.findIndex((player) => player.id === playerId);
}

export function getCurrentPlayer(state: GameState): PlayerState {
  return state.players[state.currentPlayerIndex];
}

export function isActiveTurn(state: GameState, playerId: string): boolean {
  return state.phase !== 'finished' && getCurrentPlayer(state).id === playerId;
}

export function updatePlayerAtIndex(state: GameState, playerIndex: number, player: PlayerState): GameState {
  const players = state.players.map((current, index) => (index === playerIndex ? player : clonePlayer(current)));
  return { ...state, players };
}

export function resolveCardFromSource(state: GameState, player: PlayerState, source: CardSource) {
  if (source.kind === 'board') {
    return getBoardCard(state, source);
  }
  return player.reservedCards[source.index] ?? null;
}
