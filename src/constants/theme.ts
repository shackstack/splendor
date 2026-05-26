import type { CardLevel } from '../types/card';
import type { GemType, RegularGemType } from '../types/gems';

export const GEM_LABELS: Record<GemType, string> = {
  diamond: '다이아',
  sapphire: '사파이',
  emerald: '에메',
  ruby: '루비',
  onyx: '오닉스',
  gold: '골드',
};

export const GEM_STYLES: Record<GemType, { bg: string; text: string; ring: string }> = {
  diamond: { bg: 'bg-white', text: 'text-slate-800', ring: 'ring-slate-300' },
  sapphire: { bg: 'bg-blue-500', text: 'text-white', ring: 'ring-blue-400' },
  emerald: { bg: 'bg-emerald-500', text: 'text-white', ring: 'ring-emerald-400' },
  ruby: { bg: 'bg-red-500', text: 'text-white', ring: 'ring-red-400' },
  onyx: { bg: 'bg-slate-900', text: 'text-white', ring: 'ring-slate-600' },
  gold: { bg: 'bg-amber-400', text: 'text-slate-900', ring: 'ring-amber-300' },
};

export const CARD_LEVEL_STYLES: Record<
  CardLevel,
  { border: string; header: string; label: string }
> = {
  1: {
    border: 'border-emerald-600',
    header: 'bg-emerald-700',
    label: '1등급',
  },
  2: {
    border: 'border-amber-500',
    header: 'bg-amber-600',
    label: '2등급',
  },
  3: {
    border: 'border-blue-600',
    header: 'bg-blue-700',
    label: '3등급',
  },
};

export const REGULAR_GEM_ORDER: RegularGemType[] = [
  'diamond',
  'sapphire',
  'emerald',
  'ruby',
  'onyx',
];

export function formatNobleName(id: string): string {
  return id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
