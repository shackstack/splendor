/** 백옥, 흑요석, 비취, 홍옥, 황옥 (보너스/비용/귀족 요구에 사용) */
export type RegularGemType =
  | 'baekok'
  | 'heugyoseok'
  | 'bijae'
  | 'hongok'
  | 'hwangok';

/** RegularGemType + 기옥(와일드). 기옥은 보너스가 아니며 비용 할인에만 사용 */
export type GemType = RegularGemType | 'giok';

/** 보석 개수 맵 (0이면 키 생략 가능) */
export type GemCounts = Partial<Record<GemType, number>>;

/** 일반 보석만 (뱅크·3종 가져가기 등 기옥 제외 컨텍스트) */
export type RegularGemCounts = Partial<Record<RegularGemType, number>>;

export const REGULAR_GEM_TYPES = [
  'baekok',
  'heugyoseok',
  'bijae',
  'hongok',
  'hwangok',
] as const satisfies readonly RegularGemType[];

export const GEM_TYPES = [...REGULAR_GEM_TYPES, 'giok'] as const satisfies readonly GemType[];
