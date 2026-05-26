import { GemBasket } from './GemBasket';
import { GemChip } from './GemChip';
import { GEM_LABELS, REGULAR_GEM_ORDER } from '../../constants/theme';
import { useGemDragToBasket } from '../../hooks/useGemDragToBasket';
import { canAddGemToBasket } from '../../utils/gemBasket';
import { getGemCount } from '../../game/logic/gems';
import type { GemCounts, RegularGemType } from '../../types/gems';

interface GemPickerProps {
  bank: GemCounts;
  selectedGems: RegularGemType[];
  onAddGem: (gem: RegularGemType) => void;
  onRemoveGem: (index: number) => void;
  onClear: () => void;
}

export function GemPicker({
  bank,
  selectedGems,
  onAddGem,
  onRemoveGem,
  onClear,
}: GemPickerProps) {
  const { basketRef, isOverBasket, getGemPointerHandlers, consumeSuppressClick } =
    useGemDragToBasket(onAddGem);

  return (
    <div className="space-y-3">
      <div>
        <p className="mb-2 text-xs text-slate-400">
          뱅크에서 보석을 바구니로 드래그 (최대 3종 또는 같은 색 2개)
        </p>
        <div className="flex flex-wrap gap-3">
          {REGULAR_GEM_ORDER.map((gem) => {
            const bankCount = getGemCount(bank, gem);
            const canAdd = canAddGemToBasket(selectedGems, gem, bank);
            const disabled = bankCount === 0 || !canAdd;

            const pointerHandlers = disabled ? {} : getGemPointerHandlers(gem);

            return (
              <div key={gem} className="flex flex-col items-center gap-0.5">
                <GemChip
                  gem={gem}
                  count={bankCount}
                  draggable={!disabled}
                  disabled={disabled}
                  onClick={
                    disabled
                      ? undefined
                      : () => {
                          if (consumeSuppressClick()) return;
                          onAddGem(gem);
                        }
                  }
                  {...pointerHandlers}
                />
                <span className="text-[9px] text-slate-500">{GEM_LABELS[gem]}</span>
                {bankCount >= 4 && selectedGems.length <= 1 && (
                  <span className="text-[9px] text-amber-400/80">×2 가능</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <GemBasket
        gems={selectedGems}
        basketRef={basketRef}
        isDropTarget={isOverBasket}
        onRemoveGem={onRemoveGem}
        onClear={onClear}
      />
    </div>
  );
}
