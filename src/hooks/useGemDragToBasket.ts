import { useCallback, useRef, useState } from 'react';

import type { RegularGemType } from '../types/gems';

const DRAG_THRESHOLD_PX = 10;

function isPointInRect(x: number, y: number, rect: DOMRect): boolean {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

interface DragState {
  gem: RegularGemType;
  startX: number;
  startY: number;
  dragging: boolean;
}

export function useGemDragToBasket(onDrop: (gem: RegularGemType) => void) {
  const basketRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const [isOverBasket, setIsOverBasket] = useState(false);
  const [draggingGem, setDraggingGem] = useState<RegularGemType | null>(null);

  const isOverBasketAt = useCallback((x: number, y: number) => {
    const el = basketRef.current;
    if (!el) return false;
    return isPointInRect(x, y, el.getBoundingClientRect());
  }, []);

  const getGemPointerHandlers = useCallback(
    (gem: RegularGemType) => ({
      onPointerDown: (event: React.PointerEvent) => {
        if (event.button !== 0) return;
        dragRef.current = {
          gem,
          startX: event.clientX,
          startY: event.clientY,
          dragging: false,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
      },
      onPointerMove: (event: React.PointerEvent) => {
        const drag = dragRef.current;
        if (!drag || drag.gem !== gem) return;

        if (!drag.dragging) {
          const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
          if (distance >= DRAG_THRESHOLD_PX) {
            drag.dragging = true;
            setDraggingGem(gem);
          }
        }

        if (drag.dragging) {
          setIsOverBasket(isOverBasketAt(event.clientX, event.clientY));
        }
      },
      onPointerUp: (event: React.PointerEvent) => {
        const drag = dragRef.current;
        if (!drag || drag.gem !== gem) return;

        dragRef.current = null;
        setDraggingGem(null);
        setIsOverBasket(false);

        if (drag.dragging) {
          suppressClickRef.current = true;
          if (isOverBasketAt(event.clientX, event.clientY)) {
            onDrop(gem);
          }
        }

        try {
          event.currentTarget.releasePointerCapture(event.pointerId);
        } catch {
          // pointer already released
        }
      },
      onPointerCancel: () => {
        dragRef.current = null;
        setDraggingGem(null);
        setIsOverBasket(false);
      },
    }),
    [onDrop, isOverBasketAt],
  );

  const consumeSuppressClick = useCallback(() => {
    if (!suppressClickRef.current) return false;
    suppressClickRef.current = false;
    return true;
  }, []);

  return {
    basketRef,
    draggingGem,
    isOverBasket,
    getGemPointerHandlers,
    consumeSuppressClick,
  };
}
