/** 다이아몬드, 사파이어, 에메랄드, 루비, 오닉스 (보너스/비용/귀족 요구에 사용) */
export type RegularGemType =
  | 'diamond'
  | 'sapphire'
  | 'emerald'
  | 'ruby'
  | 'onyx';

/** RegularGemType + 골드(와일드). 골드는 보너스가 아니며 비용 할인에만 사용 */
export type GemType = RegularGemType | 'gold';

/** 보석 개수 맵 (0이면 키 생략 가능) */
export type GemCounts = Partial<Record<GemType, number>>;

/** 일반 보석만 (뱅크·3종 가져가기 등 골드 제외 컨텍스트) */
export type RegularGemCounts = Partial<Record<RegularGemType, number>>;

export const REGULAR_GEM_TYPES = [
  'diamond',
  'sapphire',
  'emerald',
  'ruby',
  'onyx',
] as const satisfies readonly RegularGemType[];

export const GEM_TYPES = [...REGULAR_GEM_TYPES, 'gold'] as const satisfies readonly GemType[];
