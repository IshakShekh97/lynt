"use client";

import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  Link as LinkIcon,
  ExternalLink,
  GripVertical,
  Edit2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LinkDialog } from "./LinkDialog";
import type { Link } from "@/lib/actions/link.action";

const ITEM_TYPE = "LINK";

interface DraggableLinkProps {
  link: Link;
  index: number;
  moveLink: (dragIndex: number, hoverIndex: number) => void;
  onDelete?: (linkId: string) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  isPreview?: boolean;
  userId?: string;
  onRefresh?: () => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

// Preview version of the link (no drag and drop)
function LinkPreview({ link }: { link: Link }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Open link in new tab
    window.open(link.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      className={`
        group relative transition-all duration-200 hover:shadow-md cursor-pointer hover:scale-102
        ${!link.isActive ? "opacity-60" : ""}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {link.iconUrl ? (
            <Image
              src={link.iconUrl}
              alt={`${link.title} icon`}
              width={24}
              height={24}
              className="w-6 h-6 rounded-sm flex-shrink-0"
            />
          ) : (
            <LinkIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {link.title}
            </h3>
            {link.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {link.description}
              </p>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
              {link.url}
            </p>
          </div>
        </div>

        <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
      </div>
    </Card>
  );
}

// Management version of the link (with drag and drop)
function LinkManager({
  link,
  index,
  moveLink,
  onDelete,
  onDragStart,
  onDragEnd,
  userId,
  onRefresh,
}: Omit<DraggableLinkProps, "isPreview">) {
  const ref = useRef<HTMLDivElement>(null);
  const dragItemRef = useRef<DragItem | null>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: string | symbol | null }
  >({
    accept: ITEM_TYPE,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset?.y ?? 0) - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveLink(dragIndex, hoverIndex);

      // Update the drag item's index to reflect the new position
      // This is crucial for preventing multiple rapid moves
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: () => {
      const dragItem: DragItem = {
        id: link.id,
        index,
        type: ITEM_TYPE,
      };
      dragItemRef.current = dragItem;
      onDragStart?.();
      return dragItem;
    },
    end: () => {
      dragItemRef.current = null;
      onDragEnd?.();
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;

  // Combine drag and drop refs
  drag(drop(ref));

  return (
    <Card
      ref={ref}
      style={{ opacity }}
      data-handler-id={handlerId}
      className={`
        group relative transition-all duration-200 hover:shadow-md cursor-grab active:cursor-grabbing
        ${
          isDragging
            ? "scale-105 shadow-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
            : ""
        }
        ${!link.isActive ? "opacity-60" : ""}
      `}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="flex items-center text-gray-400 hover:text-gray-600 transition-colors">
          <GripVertical className="h-4 w-4" />
        </div>

        <div className="flex items-center gap-3 flex-1 min-w-0">
          {link.iconUrl ? (
            <Image
              src={link.iconUrl}
              alt={`${link.title} icon`}
              width={24}
              height={24}
              className="w-6 h-6 rounded-sm flex-shrink-0"
            />
          ) : (
            <LinkIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 dark:text-gray-100 truncate">
              {link.title}
            </h3>
            {link.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {link.description}
              </p>
            )}
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
              {link.url}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {userId && (
            <LinkDialog
              userId={userId}
              link={link}
              onSuccess={onRefresh}
              trigger={
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Edit2 className="h-4 w-4" />
                </Button>
              }
            />
          )}
          {onDelete && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the link &quot;{link.title}&quot; and remove all associated
                    click data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => onDelete(link.id)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Link
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      <div className="absolute bottom-1 right-2 text-xs text-gray-400">
        {link.clicks} clicks
      </div>
    </Card>
  );
}

export function DraggableLink({
  link,
  index,
  moveLink,
  onDelete,
  onDragStart,
  onDragEnd,
  isPreview = false,
  userId,
  onRefresh,
}: DraggableLinkProps) {
  // Use different components for preview and management modes
  if (isPreview) {
    return <LinkPreview link={link} />;
  }

  return (
    <LinkManager
      link={link}
      index={index}
      moveLink={moveLink}
      onDelete={onDelete}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      userId={userId}
      onRefresh={onRefresh}
    />
  );
}
