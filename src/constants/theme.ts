import type { CardLevel } from '../types/card';
import type { GemType, RegularGemType } from '../types/gems';

/** 오행 정령석 이름 */
export const GEM_LABELS: Record<GemType, string> = {
  baekok:      '금기석',   // 金
  heugyoseok:  '수기석',   // 水
  bijae:       '목기석',   // 木
  hongok:      '화기석',   // 火
  hwangok:     '토기석',   // 土
  giok:        '기운석',   // 氣 (와일드)
};

/** 오행 원소 이름 (짧은 표시용) */
export const GEM_ELEMENT_LABELS: Record<GemType, string> = {
  baekok:     '金',
  heugyoseok: '水',
  bijae:      '木',
  hongok:     '火',
  hwangok:    '土',
  giok:       '氣',
};

export const GEM_STYLES: Record<GemType, { bg: string; text: string; ring: string }> = {
  baekok:     { bg: 'bg-[#e2e8f0]', text: 'text-slate-800', ring: 'ring-slate-300' },
  heugyoseok: { bg: 'bg-[#475569]', text: 'text-white',     ring: 'ring-slate-500' },
  bijae:      { bg: 'bg-[#4ade80]', text: 'text-slate-900', ring: 'ring-green-400' },
  hongok:     { bg: 'bg-[#f87171]', text: 'text-white',     ring: 'ring-red-400'   },
  hwangok:    { bg: 'bg-[#facc15]', text: 'text-slate-900', ring: 'ring-yellow-400'},
  giok:       { bg: 'bg-[#a78bfa]', text: 'text-white',     ring: 'ring-violet-400'},
};

/** 공개·예약·구매 카드 타일 공통 크기 */
export const CARD_TILE_SIZE = {
  className:   'h-[118px] w-[100px]',
  heightClass: 'h-[118px]',
} as const;

/** 귀족(신수) 타일 크기 */
export const NOBLE_TILE_SIZE = {
  className: 'w-[100px]',
} as const;

/** 정령 카드 등급 스타일 */
export const CARD_LEVEL_STYLES: Record<
  CardLevel,
  { border: string; header: string; label: string; sublabel: string }
> = {
  1: {
    border:   'border-emerald-600',
    header:   'bg-emerald-700',
    label:    '하급',
    sublabel: '하급 정령',
  },
  2: {
    border:   'border-amber-500',
    header:   'bg-amber-600',
    label:    '중급',
    sublabel: '중급 정령',
  },
  3: {
    border:   'border-blue-600',
    header:   'bg-blue-700',
    label:    '상급',
    sublabel: '상급 정령',
  },
};

export const REGULAR_GEM_ORDER: RegularGemType[] = [
  'baekok',
  'heugyoseok',
  'bijae',
  'hongok',
  'hwangok',
];

/** 신수 한국어 이름 */
export const NOBLE_NAMES: Record<string, string> = {
  jujak:       '주작',
  cheongnyong: '청룡',
  hyeonmu:     '현무',
  baekho:      '백호',
  hwangnyong:  '황룡',
  girin:       '기린',
  bongwhang:   '봉황',
  haetae:      '해태',
  samjogo:     '삼족오',
  imugi:       '이무기',
};

/** 신수 속성 설명 */
export const NOBLE_DESCRIPTIONS: Record<string, string> = {
  jujak:       '남방 화신',
  cheongnyong: '동방 목신',
  hyeonmu:     '북방 수신',
  baekho:      '서방 금신',
  hwangnyong:  '중앙 토신',
  girin:       '오행 조화',
  bongwhang:   '불사 재생',
  haetae:      '정의 수호',
  samjogo:     '태양 신조',
  imugi:       '승천 대기',
};

/** 신수 원소 색 (배경/테두리용) */
export const NOBLE_COLORS: Record<string, { bg: string; border: string; glow: string }> = {
  jujak:       { bg: 'from-red-900/90 to-orange-950',    border: 'border-red-500/60',    glow: '#ef4444' },
  cheongnyong: { bg: 'from-emerald-900/90 to-teal-950',  border: 'border-emerald-500/60', glow: '#22c55e' },
  hyeonmu:     { bg: 'from-slate-900/90 to-blue-950',    border: 'border-slate-500/60',  glow: '#475569' },
  baekho:      { bg: 'from-slate-700/90 to-slate-900',   border: 'border-slate-400/60',  glow: '#94a3b8' },
  hwangnyong:  { bg: 'from-yellow-900/90 to-amber-950',  border: 'border-yellow-500/60', glow: '#facc15' },
  girin:       { bg: 'from-violet-900/90 to-purple-950', border: 'border-violet-500/60', glow: '#a78bfa' },
  bongwhang:   { bg: 'from-rose-900/90 to-red-950',      border: 'border-rose-500/60',   glow: '#f43f5e' },
  haetae:      { bg: 'from-cyan-900/90 to-slate-900',    border: 'border-cyan-500/60',   glow: '#06b6d4' },
  samjogo:     { bg: 'from-amber-900/90 to-yellow-950',  border: 'border-amber-500/60',  glow: '#f59e0b' },
  imugi:       { bg: 'from-blue-900/90 to-cyan-950',     border: 'border-blue-500/60',   glow: '#3b82f6' },
};
