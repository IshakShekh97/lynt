"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LinkForm } from "@/components/form/LinkForm";
import {
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  GripVertical,
  ExternalLink,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteLink, updateLinksOrder } from "@/lib/actions/links.action";
import { logUserActivity } from "@/lib/actions/activity.action";
import { trackLinkClick } from "@/lib/click-tracker";
import { toast } from "sonner";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

interface Link {
  id: string;
  title: string;
  url: string;
  description?: string | null;
  emoji?: string | null;
  isActive: boolean;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  order: number;
}

interface EnhancedLinkManagerProps {
  links: Link[];
  userId: string;
  onRefresh?: () => void;
}

export const EnhancedLinkManager: React.FC<EnhancedLinkManagerProps> = ({
  links,
  userId,
  onRefresh,
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReordering, setIsReordering] = useState(false);

  const handleCreateSuccess = async () => {
    setIsCreateDialogOpen(false);

    // Log the creation activity
    await logUserActivity({
      action: "created",
      entity: "link",
    });

    onRefresh?.();
  };

  const handleEditSuccess = async () => {
    setIsEditDialogOpen(false);

    // Log the update activity
    if (selectedLink) {
      await logUserActivity({
        action: "updated",
        entity: "link",
        entityId: selectedLink.id,
        linkId: selectedLink.id,
      });
    }

    setSelectedLink(null);
    onRefresh?.();
  };

  const handleEdit = (link: Link) => {
    setSelectedLink(link);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (link: Link) => {
    setSelectedLink(link);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedLink) return;

    try {
      setIsDeleting(true);
      const result = await deleteLink(selectedLink.id);

      if (result.success) {
        // Log the deletion activity
        await logUserActivity({
          action: "deleted",
          entity: "link",
          entityId: selectedLink.id,
          details: {
            title: selectedLink.title,
            url: selectedLink.url,
          },
        });

        toast.success(result.message);
        setIsDeleteDialogOpen(false);
        setSelectedLink(null);
        onRefresh?.();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error deleting link:", error);
      toast.error("Failed to delete link");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    try {
      setIsReordering(true);

      // Create a new array with the reordered links
      const reorderedLinks = Array.from(links);
      const [reorderedLink] = reorderedLinks.splice(sourceIndex, 1);
      reorderedLinks.splice(destinationIndex, 0, reorderedLink);

      // Update the order values
      const linkOrders = reorderedLinks.map((link, index) => ({
        id: link.id,
        order: index,
      }));

      const updateResult = await updateLinksOrder(linkOrders);

      if (updateResult.success) {
        // Log the reorder activity
        await logUserActivity({
          action: "reordered",
          entity: "links",
          details: {
            from: sourceIndex,
            to: destinationIndex,
          },
        });

        toast.success("Links reordered successfully");
        onRefresh?.();
      } else {
        toast.error(updateResult.message);
      }
    } catch (error) {
      console.error("Error reordering links:", error);
      toast.error("Failed to reorder links");
    } finally {
      setIsReordering(false);
    }
  };

  const formatUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  };

  const handleLinkClick = async (link: Link) => {
    // Track the click
    await trackLinkClick(link.id, userId);

    // Open the link in a new tab
    window.open(link.url, "_blank");
  };

  const sortedLinks = [...links].sort((a, b) => a.order - b.order);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Death Arsenal
          <Badge variant="secondary" className="ml-2">
            {links.length} brutal weapons
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="space-y-4">
            {/* Create Link Button */}
            <AlertDialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button className="w-full" disabled={isReordering}>
                  <Plus className="mr-2 h-4 w-4" />
                  Craft Deadly Weapon
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Craft Deadly Weapon</AlertDialogTitle>
                  <AlertDialogDescription>
                    Forge a new brutal link for your arsenal of destruction.
                    Fill in the carnage details below.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <LinkForm
                  onSuccess={handleCreateSuccess}
                  onCancel={() => setIsCreateDialogOpen(false)}
                />
              </AlertDialogContent>
            </AlertDialog>

            {/* Links List */}
            {isReordering && (
              <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg border border-dashed border-primary/50">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent"></div>
                  <span className="text-sm">
                    Reorganizing weapons arsenal...
                  </span>
                </div>
              </div>
            )}

            <Droppable droppableId="links-list">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`space-y-4 transition-all duration-300 ${
                    snapshot.isDraggingOver
                      ? "bg-primary/5 rounded-xl p-4 border-2 border-dashed border-primary/30"
                      : ""
                  }`}
                >
                  {sortedLinks.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border-2 border-dashed border-muted-foreground/20">
                      <Plus className="h-16 w-16 mx-auto mb-4 opacity-40 text-primary" />
                      <p className="text-xl font-semibold mb-2">
                        No weapons of mass destruction forged yet
                      </p>
                      <p className="text-sm max-w-md mx-auto">
                        Your brutal arsenal is empty. Click the &quot;Craft
                        Deadly Weapon&quot; button above to forge your first
                        instrument of digital chaos.
                      </p>
                    </div>
                  ) : (
                    sortedLinks.map((link, index) => (
                      <Draggable
                        key={link.id}
                        draggableId={link.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={`group flex items-start sm:items-center justify-between p-4 sm:p-6 border rounded-xl bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-background/80 ${
                              snapshot.isDragging
                                ? "shadow-2xl border-primary/60 bg-background/95 scale-[1.02] rotate-1"
                                : "hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
                            } ${
                              isReordering
                                ? "opacity-50 pointer-events-none"
                                : ""
                            } ${
                              link.isActive
                                ? "border-green-200/50 dark:border-green-800/50"
                                : "border-gray-200/50 dark:border-gray-700/50"
                            }`}
                          >
                            <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-grab active:cursor-grabbing hover:bg-muted/80 rounded-lg p-2 transition-all duration-200 flex-shrink-0 mt-1 sm:mt-0 group-hover:bg-primary/10"
                              >
                                <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                              </div>

                              {link.emoji && (
                                <div className="text-2xl sm:text-3xl flex-shrink-0 animate-pulse">
                                  {link.emoji}
                                </div>
                              )}

                              <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-2 sm:gap-0">
                                  <h3 className="font-semibold text-lg truncate text-foreground group-hover:text-primary transition-colors">
                                    {link.title}
                                  </h3>
                                  {!link.isActive && (
                                    <Badge
                                      variant="destructive"
                                      className="text-xs w-fit px-2 py-1 font-medium"
                                    >
                                      💀 Weapon Disabled
                                    </Badge>
                                  )}
                                  {link.isActive && (
                                    <Badge
                                      variant="default"
                                      className="text-xs w-fit px-2 py-1 font-medium bg-green-500 hover:bg-green-600"
                                    >
                                      🔥 Armed & Deadly
                                    </Badge>
                                  )}
                                </div>

                                <div className="flex items-center space-x-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                                  <ExternalLink className="h-4 w-4 flex-shrink-0" />
                                  <button
                                    onClick={() => handleLinkClick(link)}
                                    className="truncate hover:text-primary hover:underline transition-all duration-200 min-w-0 font-medium"
                                  >
                                    {formatUrl(link.url)}
                                  </button>
                                </div>

                                {link.description && (
                                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed bg-muted/30 rounded-lg px-3 py-2">
                                    {link.description}
                                  </p>
                                )}

                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2 bg-muted/50 rounded-full px-3 py-1">
                                      <BarChart3 className="h-4 w-4 text-blue-500" />
                                      <span className="text-sm font-medium text-foreground">
                                        {link.clicks} kills
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div
                                        className={`w-3 h-3 rounded-full shadow-sm ${
                                          link.isActive
                                            ? "bg-green-500 animate-pulse"
                                            : "bg-gray-400"
                                        }`}
                                      />
                                      <span className="text-xs text-muted-foreground font-medium">
                                        {link.isActive ? "Live" : "Offline"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={isReordering}
                                  className="flex-shrink-0 h-10 w-10 rounded-full hover:bg-primary/10 group-hover:bg-primary/20 transition-all duration-200"
                                >
                                  <MoreHorizontal className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="w-48">
                                <DropdownMenuItem
                                  onClick={() => handleEdit(link)}
                                  className="hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors"
                                >
                                  <Edit className="mr-3 h-4 w-4 text-blue-500" />
                                  <span className="font-medium">
                                    Enhance Weapon
                                  </span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDeleteClick(link)}
                                  className="text-red-600 focus:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                                >
                                  <Trash2 className="mr-3 h-4 w-4 text-red-500" />
                                  <span className="font-medium">
                                    Obliterate
                                  </span>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </Draggable>
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {/* Edit Link Dialog */}
            <AlertDialog
              open={isEditDialogOpen}
              onOpenChange={setIsEditDialogOpen}
            >
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Enhance Weapon</AlertDialogTitle>
                  <AlertDialogDescription>
                    Upgrade your weapon&apos;s devastation capabilities and
                    maximize destruction potential.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                {selectedLink && (
                  <LinkForm
                    editingLink={{
                      id: selectedLink.id,
                      title: selectedLink.title,
                      url: selectedLink.url,
                      description: selectedLink.description || undefined,
                      emoji: selectedLink.emoji || undefined,
                      isActive: selectedLink.isActive,
                    }}
                    onSuccess={handleEditSuccess}
                    onCancel={() => {
                      setIsEditDialogOpen(false);
                      setSelectedLink(null);
                    }}
                  />
                )}
              </AlertDialogContent>
            </AlertDialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Annihilate Weapon</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to permanently obliterate &quot;
                    {selectedLink?.title}
                    &quot;? This devastating action will completely erase this
                    weapon from existence.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsDeleteDialogOpen(false);
                      setSelectedLink(null);
                    }}
                    disabled={isDeleting}
                  >
                    Abort Mission
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Obliterating..." : "💀 Annihilate"}
                  </Button>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </DragDropContext>
      </CardContent>
    </Card>
  );
};
