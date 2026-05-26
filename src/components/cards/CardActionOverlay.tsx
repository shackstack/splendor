interface CardActionOverlayProps {
  showReserve: boolean;
  showPurchase: boolean;
  reserveEnabled: boolean;
  purchaseEnabled: boolean;
  onReserve: () => void;
  onPurchase: () => void;
  onDismiss: () => void;
}

export function CardActionOverlay({
  showReserve,
  showPurchase,
  reserveEnabled,
  purchaseEnabled,
  onReserve,
  onPurchase,
  onDismiss,
}: CardActionOverlayProps) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-black/70 p-2"
      onClick={onDismiss}
      role="presentation"
    >
      <div
        className="flex w-full flex-col gap-1.5"
        onClick={(e) => e.stopPropagation()}
      >
        {showReserve && (
          <button
            type="button"
            disabled={!reserveEnabled}
            onClick={onReserve}
            className="min-h-9 w-full rounded-md bg-purple-600 px-2 py-1.5 text-xs font-semibold text-white disabled:opacity-40 active:bg-purple-700"
          >
            예약
          </button>
        )}
        {showPurchase && (
          <button
            type="button"
            disabled={!purchaseEnabled}
            onClick={onPurchase}
            className="min-h-9 w-full rounded-md bg-emerald-600 px-2 py-1.5 text-xs font-semibold text-white disabled:opacity-40 active:bg-emerald-700"
          >
            구매
          </button>
        )}
      </div>
    </div>
  );
}
