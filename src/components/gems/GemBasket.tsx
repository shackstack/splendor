import { GemChip } from './GemChip';
import { GEM_LABELS } from '../../constants/theme';
import { GEM_DRAG_TYPE } from '../../utils/gemBasket';
import type { RegularGemType } from '../../types/gems';

interface GemBasketProps {
  gems: RegularGemType[];
  onDropGem: (gem: RegularGemType) => void;
  onRemoveGem: (index: number) => void;
  onClear: () => void;
}

export function GemBasket({ gems, onDropGem, onRemoveGem, onClear }: GemBasketProps) {
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const gem = event.dataTransfer.getData(GEM_DRAG_TYPE) as RegularGemType;
    if (gem) {
      onDropGem(gem);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={[
        'min-h-16 rounded-xl border-2 border-dashed p-3 transition-colors',
        gems.length > 0 ? 'border-amber-500/60 bg-amber-500/5' : 'border-slate-600 bg-slate-800/50',
      ].join(' ')}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold text-slate-300">바구니</p>
        {gems.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-slate-400 underline-offset-2 hover:text-white hover:underline"
          >
            비우기
          </button>
        )}
      </div>

      {gems.length === 0 ? (
        <p className="text-center text-xs text-slate-500">보석을 드래그하거나 탭해서 넣으세요</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {gems.map((gem, index) => (
            <button
              key={`${gem}-${index}`}
              type="button"
              onClick={() => onRemoveGem(index)}
              className="transition-transform active:scale-95"
              title={`${GEM_LABELS[gem]} 제거`}
            >
              <GemChip gem={gem} size="md" showCount={false} selected />
            </button>
          ))}
        </div>
      )}

      {gems.length === 2 && gems[0] === gems[1] && (
        <p className="mt-2 text-[10px] text-amber-300">{GEM_LABELS[gems[0]]} 2개 가져가기</p>
      )}
    </div>
  );
}
