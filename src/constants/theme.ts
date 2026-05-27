import type { CardLevel } from '../types/card';
import type { GemType, RegularGemType } from '../types/gems';

export const GEM_LABELS: Record<GemType, string> = {
  baekok: '백옥',
  heugyoseok: '흑요석',
  bijae: '비취',
  hongok: '홍옥',
  hwangok: '황옥',
  giok: '기옥',
};

export const GEM_STYLES: Record<GemType, { bg: string; text: string; ring: string }> = {
  baekok: { bg: 'bg-[#e2e8f0]', text: 'text-slate-800', ring: 'ring-slate-300' },
  heugyoseok: { bg: 'bg-[#475569]', text: 'text-white', ring: 'ring-slate-500' },
  bijae: { bg: 'bg-[#4ade80]', text: 'text-slate-900', ring: 'ring-green-400' },
  hongok: { bg: 'bg-[#f87171]', text: 'text-white', ring: 'ring-red-400' },
  hwangok: { bg: 'bg-[#facc15]', text: 'text-slate-900', ring: 'ring-yellow-400' },
  giok: { bg: 'bg-[#a78bfa]', text: 'text-white', ring: 'ring-violet-400' },
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
  'baekok',
  'heugyoseok',
  'bijae',
  'hongok',
  'hwangok',
];

export function formatNobleName(id: string): string {
  return id
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}
