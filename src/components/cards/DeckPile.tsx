import { CARD_LEVEL_STYLES } from '../../constants/theme';
import type { CardLevel } from '../../types/card';

interface DeckPileProps {
  level: CardLevel;
  count: number;
  selected?: boolean;
  onClick?: () => void;
}

export function DeckPile({ level, count, selected, onClick }: DeckPileProps) {
  const style = CARD_LEVEL_STYLES[level];
  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      disabled={count === 0}
      className={[
        'flex min-h-[88px] min-w-[52px] flex-col items-center justify-center rounded-lg border-2',
        style.border,
        'bg-slate-800',
        selected ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : '',
        count === 0 ? 'opacity-40' : '',
        onClick && count > 0 ? 'active:scale-95' : '',
      ].join(' ')}
    >
      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold text-white ${style.header}`}>
        {style.label}
      </span>
      <span className="mt-1 text-lg font-bold text-slate-300">{count}</span>
      {onClick && count > 0 && (
        <span className="mt-0.5 text-[9px] text-slate-500">예약</span>
      )}
    </Component>
  );
}
