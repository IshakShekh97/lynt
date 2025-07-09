import { useCallback, useRef } from "react";
import { DropResult, DragStart, DragUpdate } from "@hello-pangea/dnd";

interface UseDragDropOptimizationOptions {
  onDragEnd: (result: DropResult) => void;
  onDragStart?: (start: DragStart) => void;
  onDragUpdate?: (update: DragUpdate) => void;
  debounceMs?: number;
}

/**
 * Optimized drag and drop hook that provides debouncing and performance optimizations
 * for @hello-pangea/dnd
 */
export function useDragDropOptimization({
  onDragEnd,
  onDragStart,
  onDragUpdate,
  debounceMs = 300,
}: UseDragDropOptimizationOptions) {
  const pendingUpdateRef = useRef<NodeJS.Timeout | null>(null);
  const isDraggingRef = useRef(false);

  const optimizedDragStart = useCallback(
    (start: DragStart) => {
      isDraggingRef.current = true;
      onDragStart?.(start);
    },
    [onDragStart]
  );

  const optimizedDragUpdate = useCallback(
    (update: DragUpdate) => {
      if (!isDraggingRef.current) return;
      onDragUpdate?.(update);
    },
    [onDragUpdate]
  );

  const optimizedDragEnd = useCallback(
    (result: DropResult) => {
      isDraggingRef.current = false;

      // Clear any pending updates
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
      }

      // If no destination, call immediately
      if (!result.destination || result.reason === "CANCEL") {
        onDragEnd(result);
        return;
      }

      // If no movement, call immediately
      if (result.destination.index === result.source.index) {
        onDragEnd(result);
        return;
      }

      // Debounce the actual drag end handling for performance
      pendingUpdateRef.current = setTimeout(() => {
        onDragEnd(result);
      }, debounceMs);
    },
    [onDragEnd, debounceMs]
  );

  const cleanup = useCallback(() => {
    if (pendingUpdateRef.current) {
      clearTimeout(pendingUpdateRef.current);
    }
    isDraggingRef.current = false;
  }, []);

  return {
    onDragStart: optimizedDragStart,
    onDragUpdate: optimizedDragUpdate,
    onDragEnd: optimizedDragEnd,
    cleanup,
    isDragging: () => isDraggingRef.current,
  };
}
