"use client";

import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  DragStart,
  DragUpdate,
  ResponderProvided,
} from "@hello-pangea/dnd";
import { DraggableLink } from "./DraggableLink";
import { LinkDialog } from "./LinkDialog";
import { reorderLinks, deleteLink } from "@/lib/actions/link.action";
import type { Link } from "@/lib/actions/link.action";
import { toast } from "sonner";

interface LinkListProps {
  links: Link[];
  userId: string;
  isPreview?: boolean;
  onRefresh?: () => void;
  disabled?: boolean;
}

// Inner list component to prevent unnecessary re-renders
const InnerLinkList = React.memo(function InnerLinkList({
  links,
  onDelete,
  userId,
  onRefresh,
  isPreview,
  disabled,
}: {
  links: Link[];
  onDelete: (linkId: string) => Promise<void>;
  userId: string;
  onRefresh?: () => void;
  isPreview?: boolean;
  disabled?: boolean;
}) {
  return (
    <>
      {links.map((link, index) => (
        <DraggableLink
          key={link.id}
          link={link}
          index={index}
          onDelete={onDelete}
          isPreview={isPreview}
          userId={userId}
          onRefresh={onRefresh}
          disabled={disabled}
        />
      ))}
    </>
  );
});

export function LinkList({
  links: initialLinks,
  userId,
  isPreview = false,
  onRefresh,
  disabled = false,
}: LinkListProps) {
  const [links, setLinks] = useState<Link[]>(() =>
    [...initialLinks].sort((a, b) => a.order - b.order)
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  // Refs for tracking state
  const originalOrderRef = useRef<string[]>([]);
  const pendingUpdateRef = useRef<NodeJS.Timeout | null>(null);

  // Debug mode for development
  const DEBUG_MODE = process.env.NODE_ENV === "development";

  const debugLog = useCallback(
    (message: string, data?: unknown) => {
      if (DEBUG_MODE) {
        console.log(`[LinkList] ${message}`, data);
      }
    },
    [DEBUG_MODE]
  );

  // Update links when props change
  useEffect(() => {
    const sortedLinks = [...initialLinks].sort((a, b) => a.order - b.order);
    setLinks(sortedLinks);
    originalOrderRef.current = sortedLinks.map((link) => link.id);
    debugLog("Links updated from props", { count: sortedLinks.length });
  }, [initialLinks, debugLog]);

  // Optimized delete handler
  const handleDelete = useCallback(
    async (linkId: string) => {
      try {
        debugLog("Deleting link", { linkId });
        const result = await deleteLink(linkId);

        if (result.success) {
          setLinks((prevLinks) =>
            prevLinks.filter((link) => link.id !== linkId)
          );
          toast.success("Link deleted successfully");
          onRefresh?.();
        } else {
          toast.error(result.error || "Failed to delete link");
        }
      } catch (error) {
        console.error("Error deleting link:", error);
        toast.error("Failed to delete link");
      }
    },
    [onRefresh, debugLog]
  );

  // Optimized reorder function with debouncing
  const handleReorder = useCallback(
    async (newOrder: string[]) => {
      if (isReordering) {
        debugLog("Reorder already in progress, skipping");
        return;
      }

      // Check if order actually changed
      const currentOrder = links.map((link) => link.id);
      if (JSON.stringify(currentOrder) === JSON.stringify(newOrder)) {
        debugLog("No order change detected");
        return;
      }

      setIsReordering(true);

      try {
        debugLog("Reordering links", { from: currentOrder, to: newOrder });
        const result = await reorderLinks(userId, { linkIds: newOrder });

        if (result.success && result.data) {
          const sortedLinks = result.data.sort((a, b) => a.order - b.order);
          setLinks(sortedLinks);
          originalOrderRef.current = newOrder;
          toast.success("Links reordered successfully");
          onRefresh?.();
        } else {
          // Revert to original order on error
          debugLog("Reorder failed, reverting", result.error);
          const revertedLinks = originalOrderRef.current
            .map((id) => links.find((link) => link.id === id))
            .filter(Boolean) as Link[];
          setLinks(revertedLinks);
          toast.error(result.error || "Failed to reorder links");
        }
      } catch (error) {
        console.error("Error reordering links:", error);
        // Revert on error
        const revertedLinks = originalOrderRef.current
          .map((id) => links.find((link) => link.id === id))
          .filter(Boolean) as Link[];
        setLinks(revertedLinks);
        toast.error("Failed to reorder links");
      } finally {
        setIsReordering(false);
      }
    },
    [links, userId, isReordering, onRefresh, debugLog]
  );

  // Drag handlers
  const handleDragStart = useCallback(
    (start: DragStart, provided: ResponderProvided) => {
      setIsDragging(true);
      originalOrderRef.current = links.map((link) => link.id);
      debugLog("Drag started", { draggableId: start.draggableId });

      // Provide accessibility announcement
      provided.announce(`Started dragging ${start.draggableId}`);
    },
    [links, debugLog]
  );

  const handleDragUpdate = useCallback(
    (update: DragUpdate, provided: ResponderProvided) => {
      // Provide accessibility updates
      if (update.destination) {
        provided.announce(
          `Moved ${update.draggableId} to position ${
            update.destination.index + 1
          }`
        );
      }
    },
    []
  );

  const handleDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      setIsDragging(false);

      const { destination, source, draggableId, reason } = result;

      // Handle cancellation
      if (reason === "CANCEL" || !destination) {
        debugLog("Drag cancelled or no destination");
        provided.announce(`Drag cancelled for ${draggableId}`);
        return;
      }

      // No movement
      if (destination.index === source.index) {
        debugLog("No movement detected");
        provided.announce(`${draggableId} returned to original position`);
        return;
      }

      // Optimistic update
      const newLinks = Array.from(links);
      const [removed] = newLinks.splice(source.index, 1);
      newLinks.splice(destination.index, 0, removed);

      setLinks(newLinks);
      provided.announce(
        `Moved ${draggableId} from position ${source.index + 1} to position ${
          destination.index + 1
        }`
      );

      // Debounced database update
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
      }

      pendingUpdateRef.current = setTimeout(() => {
        const newOrder = newLinks.map((link) => link.id);
        handleReorder(newOrder);
      }, 300); // 300ms debounce
    },
    [links, handleReorder, debugLog]
  );

  // Cleanup pending updates on unmount
  useEffect(() => {
    return () => {
      if (pendingUpdateRef.current) {
        clearTimeout(pendingUpdateRef.current);
      }
    };
  }, []);

  // Memoize filtered links for preview mode
  const displayLinks = useMemo(() => {
    return isPreview ? links.filter((link) => link.isActive) : links;
  }, [links, isPreview]);

  // Loading state during reordering
  if (isReordering) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Links</h3>
          {!isPreview && <LinkDialog userId={userId} onSuccess={onRefresh} />}
        </div>
        <div className="text-center py-4 text-gray-500">
          Updating link order...
        </div>
      </div>
    );
  }

  // Empty states
  if (displayLinks.length === 0) {
    if (isPreview) {
      return (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No active links to display
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Links</h3>
          <LinkDialog userId={userId} onSuccess={onRefresh} />
        </div>
        <div className="text-center py-8">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            No links added yet
          </div>
          <LinkDialog userId={userId} onSuccess={onRefresh} />
        </div>
      </div>
    );
  }

  // Preview mode (no drag and drop)
  if (isPreview) {
    return (
      <div className="space-y-3">
        <InnerLinkList
          links={displayLinks}
          onDelete={handleDelete}
          userId={userId}
          onRefresh={onRefresh}
          isPreview={true}
          disabled={disabled}
        />
      </div>
    );
  }

  // Management mode with drag and drop
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Links</h3>
        <LinkDialog userId={userId} onSuccess={onRefresh} />
      </div>

      <DragDropContext
        onDragStart={handleDragStart}
        onDragUpdate={handleDragUpdate}
        onDragEnd={handleDragEnd}
      >
        <Droppable droppableId="links-list" type="LINK">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`
                space-y-3 transition-colors duration-200
                ${
                  snapshot.isDraggingOver
                    ? "bg-blue-50 dark:bg-blue-900/10 rounded-lg p-2"
                    : ""
                }
              `}
            >
              <InnerLinkList
                links={displayLinks}
                onDelete={handleDelete}
                userId={userId}
                onRefresh={onRefresh}
                isPreview={false}
                disabled={disabled || isDragging}
              />
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
