import type { Action, GameState, RegularGemType } from '../../types/index';
import { MAX_GEMS_IN_HAND, MAX_RESERVED_CARDS, REGULAR_GEM_TYPES } from '../../types/index';
import { CARD_LEVELS } from './constants';
import { getGemCount, getTotalGemCount } from './gems';
import { buildMinimumPayment } from './player';
import { getCurrentPlayer, isActiveTurn } from './state-access';
import { combinations } from './utils';

function getAvailableBankColors(state: GameState): RegularGemType[] {
  return REGULAR_GEM_TYPES.filter((gem) => getGemCount(state.gemBank, gem) > 0);
}

export function getValidActions(state: GameState, playerId: string): Action[] {
  if (!isActiveTurn(state, playerId)) return [];

  const player = getCurrentPlayer(state);
  const actions: Action[] = [];
  const availableColors = getAvailableBankColors(state);
  const currentGemTotal = getTotalGemCount(player.gems);

  for (let size = Math.min(3, availableColors.length); size >= 1; size -= 1) {
    for (const combo of combinations(availableColors, size)) {
      if (currentGemTotal + combo.length <= MAX_GEMS_IN_HAND) {
        actions.push({ type: 'take_three_gems', gems: combo });
      }
    }
  }

  for (const gem of REGULAR_GEM_TYPES) {
    if (getGemCount(state.gemBank, gem) >= 4 && currentGemTotal + 2 <= MAX_GEMS_IN_HAND) {
      actions.push({ type: 'take_two_gems', gem });
    }
  }

  if (player.reservedCards.length < MAX_RESERVED_CARDS) {
    for (const level of CARD_LEVELS) {
      if (state.decks[level].length > 0) {
        const goldIncoming = getGemCount(state.gemBank, 'giok') > 0 ? 1 : 0;
        if (currentGemTotal + goldIncoming <= MAX_GEMS_IN_HAND) {
          actions.push({ type: 'reserve_card', source: { kind: 'deck', level } });
        }
      }

      state.board[level].forEach((slot, slotIndex) => {
        if (!slot.card) return;
        const goldIncoming = getGemCount(state.gemBank, 'giok') > 0 ? 1 : 0;
        if (currentGemTotal + goldIncoming <= MAX_GEMS_IN_HAND) {
          actions.push({
            type: 'reserve_card',
            source: { kind: 'board', level, slotIndex },
          });
        }
      });
    }
  }

  for (const level of CARD_LEVELS) {
    state.board[level].forEach((slot, slotIndex) => {
      if (!slot.card) return;
      const payment = buildMinimumPayment(player, slot.card);
      if (payment) {
        actions.push({
          type: 'purchase_card',
          source: { kind: 'board', level, slotIndex },
          payment,
        });
      }
    });
  }

  player.reservedCards.forEach((card, index) => {
    const payment = buildMinimumPayment(player, card);
    if (payment) {
      actions.push({
        type: 'purchase_card',
        source: { kind: 'reserved', index },
        payment,
      });
    }
  });

  return actions;
}
// 단위 테스트:
// 현재 턴이 아닌 playerId -> []
// bank baekok >= 4 && 손패 8개 -> take_two_gems baekok 포함
// 예약 3장 -> reserve_card 없음
// 구매 가능 카드 -> purchase_card 포함
