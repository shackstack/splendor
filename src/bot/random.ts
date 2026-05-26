import type { Action } from '../types/index';
import { pickRandom } from './utils';

export function randomBotAction(actions: Action[]): Action {
  return pickRandom(actions);
}
