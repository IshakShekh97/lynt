"use client";

import React, { useCallback } from "react";
import {
  DragDropContext,
  DropResult,
  DragStart,
  DragUpdate,
  ResponderProvided,
} from "@hello-pangea/dnd";

interface DragDropProviderProps {
  children: React.ReactNode;
  onDragEnd: (result: DropResult, provided: ResponderProvided) => void;
  onDragStart?: (start: DragStart, provided: ResponderProvided) => void;
  onDragUpdate?: (update: DragUpdate, provided: ResponderProvided) => void;
  onBeforeDragStart?: (start: DragStart) => void;
  onBeforeCapture?: () => void;
  disabled?: boolean;
  enableDefaultSensors?: boolean;
}

export function DragDropProvider({
  children,
  onDragEnd,
  onDragStart,
  onDragUpdate,
  onBeforeDragStart,
  onBeforeCapture,
  disabled = false,
  enableDefaultSensors = true,
}: DragDropProviderProps) {
  // Memoize handlers to prevent unnecessary re-renders
  const handleDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      onDragEnd(result, provided);
    },
    [onDragEnd]
  );

  const handleDragStart = useCallback(
    (start: DragStart, provided: ResponderProvided) => {
      onDragStart?.(start, provided);
    },
    [onDragStart]
  );

  const handleDragUpdate = useCallback(
    (update: DragUpdate, provided: ResponderProvided) => {
      onDragUpdate?.(update, provided);
    },
    [onDragUpdate]
  );

  const handleBeforeDragStart = useCallback(
    (start: DragStart) => {
      onBeforeDragStart?.(start);
    },
    [onBeforeDragStart]
  );

  const handleBeforeCapture = useCallback(() => {
    onBeforeCapture?.();
  }, [onBeforeCapture]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragUpdate={handleDragUpdate}
      onBeforeDragStart={handleBeforeDragStart}
      onBeforeCapture={handleBeforeCapture}
      enableDefaultSensors={enableDefaultSensors}
    >
      {children}
    </DragDropContext>
  );
}
