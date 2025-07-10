"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LinkForm } from "@/components/form/LinkForm";
import { Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteLink } from "@/lib/actions/links.action";
import { toast } from "sonner";

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

interface LinkManagerProps {
  links: Link[];
  onRefresh?: () => void;
}

export const LinkManager: React.FC<LinkManagerProps> = ({
  links,
  onRefresh,
}) => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    onRefresh?.();
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
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

  return (
    <div className="space-y-4">
      {/* Create Link Button */}
      <AlertDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      >
        <AlertDialogTrigger asChild>
          <Button className="w-full">
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
      <div className="space-y-2">
        {links.map((link) => (
          <div
            key={link.id}
            className="flex items-center justify-between p-3 border rounded-lg bg-card"
          >
            <div className="flex items-center space-x-3">
              {link.emoji && <span className="text-lg">{link.emoji}</span>}
              <div>
                <h3 className="font-medium">{link.title}</h3>
                <p className="text-sm text-muted-foreground">{link.url}</p>
                {link.description && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {link.description}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  link.isActive ? "bg-green-500" : "bg-gray-400"
                }`}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleEdit(link)}>
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
          </div>
        ))}
      </div>

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
              Are you sure you want to delete &quot;{selectedLink?.title}&quot;?
              This action cannot be undone.
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
  );
};
