import { CardSlot } from '../cards/CardSlot';
import { DeckPile } from '../cards/DeckPile';
import { CARD_LEVEL_STYLES } from '../../constants/theme';
import type { CardSelection } from '../../store/uiStore';
import type { BoardSlot, CardLevel } from '../../types/card';

interface CardLevelRowProps {
  level: CardLevel;
  slots: BoardSlot[];
  deckCount: number;
  selectedCard: CardSelection | null;
  onSelectCard: (source: CardSelection) => void;
  interactive: boolean;
}

function isSameSelection(a: CardSelection | null, b: CardSelection): boolean {
  if (!a) return false;
  if (a.kind !== b.kind) return false;
  if (a.kind === 'board' && b.kind === 'board') {
    return a.level === b.level && a.slotIndex === b.slotIndex;
  }
  if (a.kind === 'deck' && b.kind === 'deck') {
    return a.level === b.level;
  }
  return false;
}

export function CardLevelRow({
  level,
  slots,
  deckCount,
  selectedCard,
  onSelectCard,
  interactive,
}: CardLevelRowProps) {
  const style = CARD_LEVEL_STYLES[level];

  return (
    <div className="flex flex-col gap-1.5">
      <span className={`text-[10px] font-semibold uppercase tracking-wide ${style.header} inline-block w-fit rounded px-2 py-0.5 text-white`}>
        {style.label}
      </span>
      <div className="flex gap-2 overflow-x-auto pb-1">
        <DeckPile
          level={level}
          count={deckCount}
          selected={isSameSelection(selectedCard, { kind: 'deck', level })}
          onClick={
            interactive
              ? () => onSelectCard({ kind: 'deck', level })
              : undefined
          }
        />
        {slots.map((slot, slotIndex) => (
          <CardSlot
            key={slotIndex}
            card={slot.card}
            selected={isSameSelection(selectedCard, {
              kind: 'board',
              level,
              slotIndex,
            })}
            onClick={
              interactive && slot.card
                ? () => onSelectCard({ kind: 'board', level, slotIndex })
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
