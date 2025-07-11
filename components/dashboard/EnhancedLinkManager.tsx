"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Plus, Edit, Trash2, MoreHorizontal, GripVertical, ExternalLink, BarChart3 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteLink, updateLinksOrder } from "@/lib/actions/links.action";
import { logActivity } from "@/lib/activity-logger";
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
    await logActivity({
      userId,
      action: "created",
      entity: "link",
    });
    
    onRefresh?.();
  };

  const handleEditSuccess = async () => {
    setIsEditDialogOpen(false);
    
    // Log the update activity
    if (selectedLink) {
      await logActivity({
        userId,
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
        await logActivity({
          userId,
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
        await logActivity({
          userId,
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
    window.open(link.url, '_blank');
  };

  const sortedLinks = [...links].sort((a, b) => a.order - b.order);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center justify-between">
          Manage Links
          <Badge variant="secondary" className="ml-2">
            {links.length} links
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
                  Add New Link
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Create New Link</AlertDialogTitle>
                  <AlertDialogDescription>
                    Add a new link to your profile. Fill in the details below.
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
                  <span className="text-sm">Reordering links...</span>
                </div>
              </div>
            )}
            
            <ScrollArea className="h-96">
              <Droppable droppableId="links-list">
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`space-y-3 transition-all duration-200 ${
                      snapshot.isDraggingOver
                        ? "bg-muted/30 rounded-lg p-2 border-2 border-dashed border-primary/50"
                        : ""
                    }`}
                  >
                    {sortedLinks.length === 0 ? (
                      <div className="text-center py-8 text-muted-foreground">
                        <Plus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No links yet</p>
                        <p className="text-sm">
                          Click the button above to add your first link
                        </p>
                      </div>
                    ) : (
                      sortedLinks.map((link, index) => (
                        <Draggable key={link.id} draggableId={link.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`flex items-center justify-between p-4 border rounded-lg bg-background transition-all duration-200 ${
                                snapshot.isDragging
                                  ? "shadow-lg border-primary/50 bg-background/95 scale-105"
                                  : "hover:shadow-md"
                              } ${
                                isReordering ? "opacity-50 pointer-events-none" : ""
                              }`}
                            >
                              <div className="flex items-center space-x-3 flex-1">
                                <div
                                  {...provided.dragHandleProps}
                                  className="cursor-grab active:cursor-grabbing hover:bg-muted rounded p-1 transition-colors"
                                >
                                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                                </div>
                                
                                {link.emoji && (
                                  <div className="text-xl">{link.emoji}</div>
                                )}
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center space-x-2 mb-1">
                                    <h3 className="font-medium truncate">{link.title}</h3>
                                    {!link.isActive && (
                                      <Badge variant="secondary" className="text-xs">
                                        Disabled
                                      </Badge>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                    <ExternalLink className="h-3 w-3" />
                                    <button
                                      onClick={() => handleLinkClick(link)}
                                      className="truncate hover:text-primary hover:underline transition-colors"
                                    >
                                      {formatUrl(link.url)}
                                    </button>
                                  </div>
                                  
                                  {link.description && (
                                    <p className="text-xs text-muted-foreground mt-1 truncate">
                                      {link.description}
                                    </p>
                                  )}
                                  
                                  <div className="flex items-center space-x-4 mt-2">
                                    <div className="flex items-center space-x-1">
                                      <BarChart3 className="h-3 w-3 text-muted-foreground" />
                                      <span className="text-xs text-muted-foreground">
                                        {link.clicks} clicks
                                      </span>
                                    </div>
                                    <div
                                      className={`w-2 h-2 rounded-full ${
                                        link.isActive ? "bg-green-500" : "bg-gray-400"
                                      }`}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    disabled={isReordering}
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() => handleEdit(link)}
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleDeleteClick(link)}
                                    className="text-red-600 focus:text-red-600"
                                  >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
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
            </ScrollArea>

            {/* Edit Link Dialog */}
            <AlertDialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Edit Link</AlertDialogTitle>
                  <AlertDialogDescription>
                    Update your link details below.
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
                  <AlertDialogTitle>Delete Link</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete &quot;{selectedLink?.title}
                    &quot;? This action cannot be undone.
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
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
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
