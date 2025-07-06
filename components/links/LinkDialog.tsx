"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Loader2 } from "lucide-react";
import { createLink, updateLink } from "@/lib/actions/link.action";
import type {
  Link,
  CreateLinkInput,
  UpdateLinkInput,
} from "@/lib/actions/link.action";
import { createLinkSchema, updateLinkSchema } from "@/lib/schemas/link.schema";
import { toast } from "sonner";
import { ZodIssue } from "zod";

interface LinkDialogProps {
  userId: string;
  link?: Link;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

// Create form component for creating new links
function CreateLinkForm({
  userId,
  onSuccess,
  onCancel,
}: {
  userId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const form = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
      iconUrl: "",
    },
  });

  const onSubmit = async (data: CreateLinkInput) => {
    try {
      const result = await createLink(userId, data);

      if (result.success) {
        toast.success("Link created successfully");
        form.reset();
        onSuccess?.();
      } else {
        toast.error(result.error || "Something went wrong");
        if (result.details) {
          result.details.forEach((error: ZodIssue) => {
            const fieldName = error.path[0] as keyof CreateLinkInput;
            form.setError(fieldName, { message: error.message });
          });
        }
      }
    } catch (error) {
      console.error("Error creating link:", error);
      toast.error("Failed to create link");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter link title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL *</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description (optional)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="iconUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/icon.png (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Link"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

// Edit form component for updating existing links
function EditLinkForm({
  link,
  onSuccess,
  onCancel,
}: {
  link: Link;
  onSuccess?: () => void;
  onCancel?: () => void;
}) {
  const form = useForm<UpdateLinkInput>({
    resolver: zodResolver(updateLinkSchema),
    defaultValues: {
      title: link.title,
      url: link.url,
      description: link.description || "",
      iconUrl: link.iconUrl || "",
      isActive: link.isActive,
    },
  });

  const onSubmit = async (data: UpdateLinkInput) => {
    try {
      const result = await updateLink(link.id, data);

      if (result.success) {
        toast.success("Link updated successfully");
        onSuccess?.();
      } else {
        toast.error(result.error || "Something went wrong");
        if (result.details) {
          result.details.forEach((error: ZodIssue) => {
            const fieldName = error.path[0] as keyof UpdateLinkInput;
            form.setError(fieldName, { message: error.message });
          });
        }
      }
    } catch (error) {
      console.error("Error updating link:", error);
      toast.error("Failed to update link");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title *</FormLabel>
              <FormControl>
                <Input placeholder="Enter link title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL *</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description (optional)"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="iconUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon URL</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/icon.png (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Active</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Inactive links won&apos;t be displayed on your profile
                </p>
              </div>
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Link"
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

export function LinkDialog({
  userId,
  link,
  onSuccess,
  trigger,
}: LinkDialogProps) {
  const [open, setOpen] = useState(false);
  const isEditing = !!link;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const defaultTrigger = isEditing ? (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
      <Edit2 className="h-4 w-4" />
    </Button>
  ) : (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Add Link
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Link" : "Add New Link"}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Make changes to your link here. Click save when you're done."
              : "Add a new link to your profile. Fill in the details below."}
          </DialogDescription>
        </DialogHeader>

        {isEditing && link ? (
          <EditLinkForm
            link={link}
            onSuccess={handleSuccess}
            onCancel={() => setOpen(false)}
          />
        ) : (
          <CreateLinkForm
            userId={userId}
            onSuccess={handleSuccess}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
