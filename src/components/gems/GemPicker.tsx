import { GemChip } from './GemChip';
import { GEM_LABELS, REGULAR_GEM_ORDER } from '../../constants/theme';
import { getGemCount } from '../../game/logic/gems';
import type { GemCounts, RegularGemType } from '../../types/gems';

interface GemPickerProps {
  bank: GemCounts;
  selectedGems: RegularGemType[];
  onToggleGem: (gem: RegularGemType) => void;
  onClear: () => void;
}

export function GemPicker({ bank, selectedGems, onToggleGem, onClear }: GemPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-400">보석 선택 (최대 3종 또는 같은 색 2개)</p>
        {selectedGems.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-slate-400 underline-offset-2 hover:text-white hover:underline"
          >
            초기화
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {REGULAR_GEM_ORDER.map((gem) => {
          const bankCount = getGemCount(bank, gem);
          const selectedCount = selectedGems.filter((g) => g === gem).length;
          const disabled = bankCount === 0;

          return (
            <button
              key={gem}
              type="button"
              disabled={disabled}
              onClick={() => onToggleGem(gem)}
              className="flex flex-col items-center gap-0.5 disabled:opacity-40"
            >
              <GemChip
                gem={gem}
                count={bankCount}
                selected={selectedCount > 0}
              />
              {selectedCount > 0 && (
                <span className="text-[10px] font-semibold text-amber-300">
                  선택 {selectedCount}
                </span>
              )}
              <span className="text-[9px] text-slate-500">{GEM_LABELS[gem]}</span>
            </button>
          );
        })}
      </div>

      {selectedGems.length > 0 && (
        <p className="text-xs text-slate-300">
          선택: {selectedGems.map((g) => GEM_LABELS[g]).join(', ')}
        </p>
      )}
    </div>
  );
}
