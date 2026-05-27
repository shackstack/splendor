import { useUiStore } from '../store/uiStore';
import type { PlayerState } from '../types/player';

/**
 * PlayerRail 등 컴포넌트 밖에서도 호출 가능한 모달 열기 함수.
 * Zustand store에 직접 접근한다.
 */
export function openPlayerDetailModal(player: PlayerState): void {
  useUiStore.getState().openDetailModal(player);
}
