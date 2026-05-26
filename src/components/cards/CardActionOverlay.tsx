import { BookmarkPlus, ShoppingCart } from 'lucide-react';

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
      className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-black/70 p-2"
      onClick={onDismiss}
      role="presentation"
    >
      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {showReserve && (
          <button
            type="button"
            aria-label="예약"
            disabled={!reserveEnabled}
            onClick={onReserve}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white disabled:opacity-40 active:bg-purple-700"
          >
            <BookmarkPlus size={16} strokeWidth={2.5} />
          </button>
        )}
        {showPurchase && (
          <button
            type="button"
            aria-label="구매"
            disabled={!purchaseEnabled}
            onClick={onPurchase}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white disabled:opacity-40 active:bg-emerald-700"
          >
            <ShoppingCart size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>
    </div>
  );
}
