import { CardSlot } from "../cards/CardSlot";
import { DeckPile } from "../cards/DeckPile";
import type { CardSelection } from "../../store/uiStore";
import type { Action } from "../../types";
import type { BoardSlot, Card, CardLevel } from "../../types/card";
import type { RegularGemCounts } from "../../types/gems";

interface CardLevelRowProps {
  level: CardLevel;
  slots: BoardSlot[];
  deckCount: number;
  selectedCard: CardSelection | null;
  onSelectCard: (source: CardSelection) => void;
  onDismiss: () => void;
  onAction: (action: Action) => void;
  getCardActions: (selection: CardSelection) => {
    reserveAction: Action | null;
    purchaseAction: Action | null;
  };
  canAffordCard?: (card: Card) => boolean;
  playerBonuses?: RegularGemCounts;
  interactive: boolean;
  compact?: boolean;
}

function isSameSelection(a: CardSelection | null, b: CardSelection): boolean {
  if (!a) return false;
  if (a.kind !== b.kind) return false;
  if (a.kind === "board" && b.kind === "board") {
    return a.level === b.level && a.slotIndex === b.slotIndex;
  }
  if (a.kind === "deck" && b.kind === "deck") {
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
  onDismiss,
  onAction,
  getCardActions,
  canAffordCard,
  playerBonuses,
  interactive,
  compact,
}: CardLevelRowProps) {
  const deckSelection: CardSelection = { kind: "deck", level };
  const deckSelected = isSameSelection(selectedCard, deckSelection);
  const deckActions = deckSelected ? getCardActions(deckSelection) : null;

  return (
    <div className={compact ? "flex min-h-0 flex-1 flex-col" : "flex flex-col gap-1.5"}>
      <div
        className={
          compact
            ? "flex h-full min-h-0 items-stretch gap-1.5 overflow-x-auto py-0.5"
            : "flex gap-2 overflow-x-auto py-2"
        }
      >
        <DeckPile
          compact={compact}
          level={level}
          count={deckCount}
          selected={deckSelected}
          selection={deckSelected ? deckSelection : undefined}
          onClick={interactive ? () => onSelectCard(deckSelection) : undefined}
          onDismiss={interactive ? onDismiss : undefined}
          onAction={interactive ? onAction : undefined}
          reserveAction={deckActions?.reserveAction}
        />
        {slots.map((slot, slotIndex) => {
          const boardSelection: CardSelection = {
            kind: "board",
            level,
            slotIndex,
          };
          const selected = isSameSelection(selectedCard, boardSelection);
          const actions = selected ? getCardActions(boardSelection) : null;

          return (
            <CardSlot
              key={slotIndex}
              compact={compact}
              card={slot.card}
              selected={selected}
              purchasable={
                interactive && !!slot.card && !!canAffordCard?.(slot.card)
              }
              selection={selected ? boardSelection : undefined}
              onClick={
                interactive && slot.card
                  ? () => onSelectCard(boardSelection)
                  : undefined
              }
              onDismiss={interactive ? onDismiss : undefined}
              onAction={interactive ? onAction : undefined}
              reserveAction={actions?.reserveAction}
              purchaseAction={actions?.purchaseAction}
              playerBonuses={playerBonuses}
            />
          );
        })}
      </div>
    </div>
  );
}
