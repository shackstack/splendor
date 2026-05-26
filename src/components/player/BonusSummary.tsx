import { GemChip } from '../gems/GemChip';
import { getBonusCounts } from '../../game/logic/player';
import type { PlayerState } from '../../types/player';
import { REGULAR_GEM_TYPES } from '../../types/gems';

interface BonusSummaryProps {
  player: PlayerState;
}

export function BonusSummary({ player }: BonusSummaryProps) {
  const bonuses = getBonusCounts(player);
  const owned = REGULAR_GEM_TYPES.filter((gem) => (bonuses[gem] ?? 0) > 0);

  if (owned.length === 0) {
    return <p className="text-xs text-slate-500">보너스 없음</p>;
  }

  return (
    <div className="flex flex-wrap gap-1">
      {owned.map((gem) => (
        <GemChip key={gem} gem={gem} count={bonuses[gem] ?? 0} size="sm" />
      ))}
    </div>
  );
}
