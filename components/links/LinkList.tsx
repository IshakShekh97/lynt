"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { DragDropProvider } from "@/components/providers/DragDropProvider";
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
}

export function LinkList({
  links: initialLinks,
  userId,
  isPreview = false,
  onRefresh,
}: LinkListProps) {
  const [links, setLinks] = useState(initialLinks);
  const [isReordering, setIsReordering] = useState(false);
  const originalOrderRef = useRef<Link[]>([]);
  const dragOperationRef = useRef<{
    dragIndex: number;
    hoverIndex: number;
    timestamp: number;
  } | null>(null);

  // Debug utilities for development
  const DEBUG_LINK_ORDERING = process.env.NODE_ENV === "development";

  const debugLog = useCallback(
    (message: string, data?: unknown) => {
      if (DEBUG_LINK_ORDERING) {
        console.log(`[LinkList Debug] ${message}`, data);
      }
    },
    [DEBUG_LINK_ORDERING]
  );

  const validateLinkOrder = useCallback(
    (links: Link[], context: string) => {
      if (DEBUG_LINK_ORDERING) {
        const orders = links.map((link) => link.order);
        const ids = links.map((link) => ({
          id: link.id,
          order: link.order,
          title: link.title,
        }));

        // Check for duplicates
        const duplicates = orders.filter(
          (order, index) => orders.indexOf(order) !== index
        );
        if (duplicates.length > 0) {
          console.warn(
            `[LinkList Debug] ${context} - Duplicate orders found:`,
            duplicates
          );
        }

        // Check for gaps
        const sortedOrders = [...orders].sort((a, b) => a - b);
        const expectedOrders = Array.from(
          { length: links.length },
          (_, i) => i
        );
        const hasGaps = !expectedOrders.every((order) =>
          sortedOrders.includes(order)
        );
        if (hasGaps) {
          console.warn(`[LinkList Debug] ${context} - Order gaps found:`, {
            expected: expectedOrders,
            actual: sortedOrders,
          });
        }

        debugLog(`${context} - Link order validation:`, ids);
      }
    },
    [DEBUG_LINK_ORDERING, debugLog]
  );

  // Ensure links are properly sorted by order on initialization and updates
  useEffect(() => {
    const sortedLinks = [...initialLinks].sort((a, b) => a.order - b.order);
    debugLog(
      "Component initialized/updated with links",
      sortedLinks.map((l) => ({ id: l.id, order: l.order, title: l.title }))
    );
    validateLinkOrder(sortedLinks, "Initial load");
    setLinks(sortedLinks);
    originalOrderRef.current = [...sortedLinks];
  }, [initialLinks, debugLog, validateLinkOrder]);

  const moveLink = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      // Prevent rapid fire operations
      if (isReordering) return;

      debugLog(`Moving link from index ${dragIndex} to ${hoverIndex}`);

      // Store the drag operation details
      dragOperationRef.current = {
        dragIndex,
        hoverIndex,
        timestamp: Date.now(),
      };

      setLinks((prevLinks) => {
        // Ensure we're working with the current state
        if (dragIndex === hoverIndex || dragIndex < 0 || hoverIndex < 0) {
          debugLog("Invalid move operation, skipping", {
            dragIndex,
            hoverIndex,
          });
          return prevLinks;
        }

        if (dragIndex >= prevLinks.length || hoverIndex >= prevLinks.length) {
          debugLog("Index out of bounds, skipping", {
            dragIndex,
            hoverIndex,
            linksLength: prevLinks.length,
          });
          return prevLinks;
        }

        // Create a completely new array to avoid any mutation issues
        const newLinks = prevLinks.slice();

        // Get the item being moved
        const draggedItem = newLinks[dragIndex];

        // Create the new array by filtering out the dragged item and inserting it at the new position
        const filteredLinks = newLinks.filter(
          (_, index) => index !== dragIndex
        );
        const reorderedLinks = [
          ...filteredLinks.slice(0, hoverIndex),
          draggedItem,
          ...filteredLinks.slice(hoverIndex),
        ];

        debugLog("Links reordered optimistically", {
          before: prevLinks.map((l) => ({ id: l.id, title: l.title })),
          after: reorderedLinks.map((l) => ({ id: l.id, title: l.title })),
          draggedItem: { id: draggedItem.id, title: draggedItem.title },
        });

        return reorderedLinks;
      });
    },
    [isReordering, debugLog]
  );

  const handleDragStart = useCallback(() => {
    // Store the original order when drag starts (not when component mounts)
    setLinks((currentLinks) => {
      originalOrderRef.current = [...currentLinks];
      return currentLinks;
    });
  }, []);

  const handleDragEnd = useCallback(async () => {
    // Prevent multiple simultaneous reorder operations
    if (isReordering) {
      console.warn("Reorder operation already in progress, skipping");
      return;
    }

    // Get the current links state at the time of drag end
    const currentLinksSnapshot = links;
    const currentOrder = currentLinksSnapshot.map((link) => link.id);
    const originalOrder = originalOrderRef.current.map((link) => link.id);

    debugLog("Drag end - checking for order changes", {
      original: originalOrder,
      current: currentOrder,
      changed: JSON.stringify(currentOrder) !== JSON.stringify(originalOrder),
    });

    // Check if the order actually changed
    const hasOrderChanged =
      JSON.stringify(currentOrder) !== JSON.stringify(originalOrder);

    if (!hasOrderChanged) {
      debugLog("No order change detected, skipping database update");
      return;
    }

    debugLog("Order changed, updating database", {
      original: originalOrder,
      current: currentOrder,
    });

    setIsReordering(true);

    try {
      // Update the order in the database
      const result = await reorderLinks(userId, { linkIds: currentOrder });

      if (result.success) {
        debugLog("Database update successful", result.data);
        toast.success("Links reordered successfully");

        // Update the state with the confirmed order from the database
        if (result.data) {
          const confirmedLinks = result.data.sort((a, b) => a.order - b.order);
          setLinks(confirmedLinks);
          originalOrderRef.current = [...confirmedLinks];
          validateLinkOrder(confirmedLinks, "After database update");
        } else {
          // Fallback: update order values based on current position
          const updatedLinks = currentLinksSnapshot.map((link, index) => ({
            ...link,
            order: index,
          }));
          setLinks(updatedLinks);
          originalOrderRef.current = [...updatedLinks];
        }

        // Trigger refresh to sync with server state
        onRefresh?.();
      } else {
        console.error("Failed to reorder links:", result.error);
        toast.error(result.error || "Failed to reorder links");

        // Revert to original order on error
        debugLog("Reverting to original order due to error");
        setLinks([...originalOrderRef.current]);
      }
    } catch (error) {
      console.error("Error reordering links:", error);
      toast.error("Failed to reorder links");

      // Revert to original order on error
      debugLog("Reverting to original order due to exception");
      setLinks([...originalOrderRef.current]);
    } finally {
      setIsReordering(false);
      dragOperationRef.current = null;
    }
  }, [links, userId, isReordering, onRefresh, debugLog, validateLinkOrder]);

  const handleDelete = useCallback(
    async (linkId: string) => {
      try {
        const result = await deleteLink(linkId);

        if (result.success) {
          toast.success("Link deleted successfully");
          setLinks((prevLinks) =>
            prevLinks.filter((link) => link.id !== linkId)
          );
          onRefresh?.();
        } else {
          toast.error(result.error || "Failed to delete link");
        }
      } catch (error) {
        console.error("Error deleting link:", error);
        toast.error("Failed to delete link");
      }
    },
    [onRefresh]
  );

  const handleSuccess = useCallback(() => {
    onRefresh?.();
  }, [onRefresh]);

  // Update links when initialLinks prop changes
  React.useEffect(() => {
    setLinks(initialLinks);
    originalOrderRef.current = [...initialLinks];
  }, [initialLinks]);

  // Filter active links for preview mode
  const displayLinks = isPreview
    ? links.filter((link) => link.isActive)
    : links;

  if (displayLinks.length === 0 && isPreview) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No active links to display
      </div>
    );
  }

  if (displayLinks.length === 0 && !isPreview) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500 dark:text-gray-400 mb-4">
          No links added yet
        </div>
        <LinkDialog userId={userId} onSuccess={handleSuccess} />
      </div>
    );
  }

  if (isPreview) {
    return (
      <div className="space-y-3">
        {displayLinks.map((link) => (
          <DraggableLink
            key={link.id}
            link={link}
            index={0}
            moveLink={() => {}}
            isPreview={true}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Links</h3>
        <LinkDialog userId={userId} onSuccess={handleSuccess} />
      </div>

      <DragDropProvider>
        <div className="space-y-3">
          {displayLinks.map((link, index) => (
            <DraggableLink
              key={`draggable-link-${link.id}`} // Stable key for better React reconciliation
              link={link}
              index={index}
              moveLink={moveLink}
              onDelete={handleDelete}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              isPreview={false}
              userId={userId}
              onRefresh={handleSuccess}
            />
          ))}
        </div>
      </DragDropProvider>
    </div>
  );
}
