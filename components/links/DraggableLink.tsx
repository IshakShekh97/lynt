"use client";

import React, { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import {
  GripVertical,
  Link as LinkIcon,
  ExternalLink,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import { Link } from "@/lib/actions/link.action";
import { LinkDialog } from "./LinkDialog";

interface DraggableLinkProps {
  link: Link;
  index: number;
  onDelete?: (linkId: string) => Promise<void>;
  isPreview?: boolean;
  userId?: string;
  onRefresh?: () => void;
  disabled?: boolean;
}

// Memoized icon display component
const LinkIconDisplay = memo(({ link }: { link: Link }) => {
  if (link.emoji) {
    return (
      <span className="text-2xl flex-shrink-0 w-6 h-6 flex items-center justify-center">
        {link.emoji}
      </span>
    );
  }

  if (link.iconUrl) {
    return (
      <Image
        src={link.iconUrl}
        alt={`${link.title} icon`}
        width={24}
        height={24}
        className="w-6 h-6 rounded-sm flex-shrink-0"
        unoptimized
      />
    );
  }

  return <LinkIcon className="w-6 h-6 text-gray-500 flex-shrink-0" />;
});

LinkIconDisplay.displayName = "LinkIconDisplay";

// Optimized drag style function
const getDragStyle = (
  style: React.CSSProperties | undefined,
  snapshot: DraggableStateSnapshot
): React.CSSProperties => {
  if (!snapshot.isDropAnimating) {
    return style || {};
  }

  const { curve, duration } = snapshot.dropAnimation || {};
  return {
    ...style,
    transition: `all ${curve} ${duration}s`,
  };
};

// Preview version of the link (no drag and drop, optimized for public view)
const LinkPreview = memo(({ link }: { link: Link }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      window.open(link.url, "_blank", "noopener,noreferrer");
    },
    [link.url]
  );

  return (
    <Card
      className={`
        group relative transition-all duration-200 hover:shadow-md cursor-pointer hover:scale-[1.02]
        ${!link.isActive ? "opacity-60" : ""}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3 p-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <LinkIconDisplay link={link} />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate">{link.title}</h3>
            {link.description && (
              <p className="text-xs text-gray-500 truncate mt-1">
                {link.description}
              </p>
            )}
          </div>
        </div>
        <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
      </div>
    </Card>
  );
});

LinkPreview.displayName = "LinkPreview";

// Management version with drag and drop
const LinkManager = memo(
  ({
    link,
    index,
    onDelete,
    userId,
    onRefresh,
    disabled = false,
  }: Omit<DraggableLinkProps, "isPreview">) => {
    const handleClick = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        if (!e.defaultPrevented) {
          window.open(link.url, "_blank", "noopener,noreferrer");
        }
      },
      [link.url]
    );

    const handleDelete = useCallback(async () => {
      if (onDelete) {
        await onDelete(link.id);
      }
    }, [onDelete, link.id]);

    // Memoize drag handle props to prevent re-renders
    const dragHandleProps = useMemo(
      () => ({
        className:
          "flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-grab active:cursor-grabbing",
      }),
      []
    );

    return (
      <Draggable
        draggableId={link.id}
        index={index}
        isDragDisabled={disabled || !link.isActive}
      >
        {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
          <Card
            ref={provided.innerRef}
            {...provided.draggableProps}
            style={getDragStyle(provided.draggableProps.style, snapshot)}
            className={`
            group relative transition-all duration-200 hover:shadow-md
            ${
              snapshot.isDragging
                ? "scale-105 shadow-lg bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 rotate-1 z-50"
                : "cursor-pointer hover:scale-[1.01]"
            }
            ${!link.isActive ? "opacity-60" : ""}
            ${disabled ? "cursor-not-allowed" : ""}
          `}
            onClick={!snapshot.isDragging ? handleClick : undefined}
          >
            <div className="flex items-center gap-3 p-4">
              {/* Drag Handle */}
              <div {...provided.dragHandleProps} {...dragHandleProps}>
                <GripVertical className="h-4 w-4" />
              </div>

              {/* Link Content */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <LinkIconDisplay link={link} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate">{link.title}</h3>
                  {link.description && (
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {link.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <LinkDialog
                  userId={userId!}
                  link={link}
                  onSuccess={onRefresh}
                  trigger={
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  }
                />

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Link</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete &quot;{link.title}
                        &quot;? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Click Stats */}
            <div className="absolute bottom-1 right-2 text-xs text-gray-400">
              {link.clicks} clicks
            </div>
          </Card>
        )}
      </Draggable>
    );
  }
);

LinkManager.displayName = "LinkManager";

// Main component
export const DraggableLink = memo<DraggableLinkProps>(
  ({
    link,
    index,
    onDelete,
    isPreview = false,
    userId,
    onRefresh,
    disabled = false,
  }) => {
    // Use different components for preview and management modes
    if (isPreview) {
      return <LinkPreview link={link} />;
    }

    return (
      <LinkManager
        link={link}
        index={index}
        onDelete={onDelete}
        userId={userId}
        onRefresh={onRefresh}
        disabled={disabled}
      />
    );
  }
);

DraggableLink.displayName = "DraggableLink";
