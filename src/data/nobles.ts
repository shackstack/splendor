import type { Noble, RegularGemCounts } from '../types/index';

type RawNoble = {
  id: string;
  requirements: RegularGemCounts;
};

/**
 * 오사신(五四神) + 5 전설 신수
 * 속성 조합은 오행 원소 매핑을 따름:
 *   bijae(목) · hongok(화) · baekok(금) · heugyoseok(수) · hwangok(토)
 */
const RAW_NOBLES: RawNoble[] = [
  // ── 오사신 (사신 + 황룡) ──────────────────────────────
  { id: 'jujak',      requirements: { bijae: 4, hongok: 4 } },         // 주작  — 목+화 (南方)
  { id: 'cheongnyong', requirements: { bijae: 4, heugyoseok: 4 } },    // 청룡  — 목+수 (東方)
  { id: 'hyeonmu',    requirements: { baekok: 4, heugyoseok: 4 } },    // 현무  — 금+수 (北方)
  { id: 'baekho',     requirements: { hwangok: 4, baekok: 4 } },       // 백호  — 토+금 (西方)
  { id: 'hwangnyong', requirements: { hwangok: 4, bijae: 4 } },        // 황룡  — 토+목 (中央)

  // ── 전설 신수 ────────────────────────────────────────
  { id: 'girin',      requirements: { hwangok: 3, hongok: 3, baekok: 3 } },    // 기린  — 토+화+금
  { id: 'bongwhang',  requirements: { bijae: 3, hongok: 3, heugyoseok: 3 } },  // 봉황  — 목+화+수
  { id: 'haetae',     requirements: { bijae: 3, baekok: 3, heugyoseok: 3 } },  // 해태  — 목+금+수
  { id: 'samjogo',    requirements: { baekok: 3, hwangok: 3, heugyoseok: 3 } }, // 삼족오 — 금+토+수
  { id: 'imugi',      requirements: { bijae: 3, hwangok: 3, hongok: 3 } },     // 이무기 — 목+토+화
];

export const ALL_NOBLES: Noble[] = RAW_NOBLES.map(({ id, requirements }) => ({
  id,
  requirements,
  points: 3,
}));

if (ALL_NOBLES.length !== 10) {
  throw new Error(`Expected 10 nobles, got ${ALL_NOBLES.length}`);
}
