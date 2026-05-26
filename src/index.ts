import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { botAction } from './bot';
import { getCardFromPurchaseAction, getCardFromReserveAction } from './bot/card';
import {
  applyAction,
  checkWinCondition,
  getValidActions,
  initGame,
} from './game/logic';
import { getHumanPlayer } from './game/logic/state-access';
import { CARD_LEVELS } from './game/logic/constants';
import { getGemCount } from './game/logic/gems';
import type {
  Action,
  Card,
  GameState,
  GemCounts,
  GemType,
  Noble,
  PlayerState,
  RegularGemType,
} from './types';
import { GEM_TYPES } from './types';

const GEM_LABELS: Record<GemType, string> = {
  diamond: '다이아',
  sapphire: '사파이',
  emerald: '에메',
  ruby: '루비',
  onyx: '오닉스',
  gold: '골드',
};

const BONUS_LABELS: Record<RegularGemType, string> = {
  diamond: '다이아',
  sapphire: '사파이',
  emerald: '에메',
  ruby: '루비',
  onyx: '오닉스',
};

function formatGemCounts(gems: GemCounts): string {
  const parts = GEM_TYPES.map((gem) => {
    const count = getGemCount(gems, gem);
    return count > 0 ? `${GEM_LABELS[gem]}${count}` : null;
  }).filter(Boolean);

  return parts.length > 0 ? parts.join(' ') : '없음';
}

function formatCard(card: Card): string {
  const cost = Object.entries(card.cost)
    .map(([gem, count]) => `${BONUS_LABELS[gem as RegularGemType]}${count}`)
    .join(' ');
  return `[${card.level}등급] +${card.points} (${BONUS_LABELS[card.bonus]} 보너스) 비용: ${cost || '없음'}`;
}

function formatNoble(noble: Noble): string {
  const requirements = Object.entries(noble.requirements)
    .map(([gem, count]) => `${BONUS_LABELS[gem as RegularGemType]}${count}`)
    .join(' ');
  return `${noble.id} (+${noble.points}) 요구: ${requirements}`;
}

function describeAction(state: GameState, player: PlayerState, action: Action): string {
  switch (action.type) {
    case 'take_three_gems':
      return `보석 가져가기: ${action.gems.map((gem) => GEM_LABELS[gem]).join(', ')}`;
    case 'take_two_gems':
      return `보석 2개 가져가기: ${GEM_LABELS[action.gem]} x2`;
    case 'reserve_card': {
      const card = getCardFromReserveAction(state, action);
      if (action.source.kind === 'deck') {
        return `덱에서 카드 예약 (${action.source.level}등급)`;
      }
      return card ? `카드 예약: ${formatCard(card)}` : '카드 예약';
    }
    case 'purchase_card': {
      const card = getCardFromPurchaseAction(state, player, action);
      return card ? `카드 구매: ${formatCard(card)}` : '카드 구매';
    }
    default:
      return '알 수 없는 행동';
  }
}

function printDivider(title: string): void {
  console.log(`\n${'='.repeat(60)}`);
  console.log(title);
  console.log('='.repeat(60));
}

function printBoard(state: GameState): void {
  console.log('\n[보석 뱅크]');
  console.log(formatGemCounts(state.gemBank));

  console.log('\n[귀족]');
  if (state.nobles.length === 0) {
    console.log('없음');
  } else {
    state.nobles.forEach((noble, index) => {
      console.log(`  ${index + 1}. ${formatNoble(noble)}`);
    });
  }

  for (const level of CARD_LEVELS) {
    console.log(`\n[${level}등급 카드]`);
    state.board[level].forEach((slot, slotIndex) => {
      if (slot.card) {
        console.log(`  ${slotIndex + 1}. ${formatCard(slot.card)}`);
      } else {
        console.log(`  ${slotIndex + 1}. (비어 있음)`);
      }
    });
  }
}

function printHumanState(player: PlayerState): void {
  console.log('\n[내 상태]');
  console.log(`점수: ${player.score}`);
  console.log(`보석: ${formatGemCounts(player.gems)}`);
  console.log(`구매 카드 (${player.purchasedCards.length}장):`);
  if (player.purchasedCards.length === 0) {
    console.log('  없음');
  } else {
    player.purchasedCards.forEach((card) => console.log(`  - ${formatCard(card)}`));
  }
  console.log(`예약 카드 (${player.reservedCards.length}장):`);
  if (player.reservedCards.length === 0) {
    console.log('  없음');
  } else {
    player.reservedCards.forEach((card, index) => {
      console.log(`  ${index + 1}. ${formatCard(card)}`);
    });
  }
  if (player.nobles.length > 0) {
    console.log('귀족:');
    player.nobles.forEach((noble) => console.log(`  - ${formatNoble(noble)}`));
  }
}

function printBotState(player: PlayerState): void {
  console.log(`\n[${player.name}]`);
  console.log(`점수: ${player.score}`);
  console.log(`구매 카드: ${player.purchasedCards.length}장`);
  console.log(`예약 카드: ${player.reservedCards.length}장`);
  console.log(`귀족: ${player.nobles.length}명`);
}

async function promptAction(
  rl: readline.Interface,
  actions: Action[],
  state: GameState,
  player: PlayerState,
): Promise<Action> {
  console.log('\n[선택지]');
  actions.forEach((action, index) => {
    console.log(`  ${index + 1}. ${describeAction(state, player, action)}`);
  });

  while (true) {
    const answer = await rl.question('\n번호를 입력하세요: ');
    const choice = Number.parseInt(answer.trim(), 10);

    if (Number.isNaN(choice) || choice < 1 || choice > actions.length) {
      console.log(`1~${actions.length} 사이의 번호를 입력해주세요.`);
      continue;
    }

    return actions[choice - 1];
  }
}

function printTurnResult(action: Action, state: GameState, player: PlayerState): void {
  console.log(`\n>> ${player.name}: ${describeAction(state, player, action)}`);
}

async function runTurn(rl: readline.Interface, state: GameState): Promise<GameState> {
  const current = state.players[state.currentPlayerIndex];
  printDivider(`턴 ${state.turnNumber} - ${current.name}`);

  printBoard(state);
  printHumanState(getHumanPlayer(state));
  state.players.filter((player) => player.isBot).forEach(printBotState);

  let action: Action;

  if (current.isBot) {
    const level = current.botLevel ?? 'greedy';
    action = botAction(state, current.id, level);
    printTurnResult(action, state, current);
  } else {
    const actions = getValidActions(state, current.id);
    if (actions.length === 0) {
      throw new Error('유효한 행동이 없습니다.');
    }
    action = await promptAction(rl, actions, state, current);
    printTurnResult(action, state, current);
  }

  return applyAction(state, action);
}

function printGameResult(state: GameState): void {
  printDivider('게임 종료');

  state.players.forEach((player) => {
    console.log(`\n${player.name} - ${player.score}점 (카드 ${player.purchasedCards.length}장)`);
  });

  const winnerId = checkWinCondition(state);
  if (winnerId) {
    const winner = state.players.find((player) => player.id === winnerId);
    console.log(`\n승자: ${winner?.name ?? winnerId}`);
  }

  if (state.winnerIds && state.winnerIds.length > 1) {
    const names = state.winnerIds
      .map((id) => state.players.find((player) => player.id === id)?.name ?? id)
      .join(', ');
    console.log(`동률 승자: ${names}`);
  }
}

async function main(): Promise<void> {
  const rl = readline.createInterface({ input, output });
  let state = initGame(2);
  const human = getHumanPlayer(state);

  console.log('스플렌더 콘솔 게임');
  console.log(`${human.name} vs ${state.players.find((p) => p.isBot)?.name ?? 'Bot'}`);

  try {
    while (state.phase !== 'finished') {
      state = await runTurn(rl, state);
    }
    printGameResult(state);
  } finally {
    rl.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
