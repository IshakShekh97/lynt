"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema, type LinkFormValues } from "@/lib/zodSchemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { EmojiPickerComponent } from "@/components/ui/emoji-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { createLink, updateLink } from "@/lib/actions/links.action";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Theme } from "emoji-picker-react";

interface LinkFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  editingLink?: {
    id: string;
    title: string;
    url: string;
    description?: string;
    emoji?: string;
    isActive: boolean;
  };
}

export const LinkForm: React.FC<LinkFormProps> = ({
  onSuccess,
  onCancel,
  editingLink,
}) => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: editingLink?.title || "",
      url: editingLink?.url || "",
      description: editingLink?.description || "",
      emoji: editingLink?.emoji || "",
      isActive: editingLink?.isActive ?? true,
    },
  });

  const onSubmit = async (data: LinkFormValues) => {
    try {
      setIsSubmitting(true);

      const result = editingLink
        ? await updateLink(editingLink.id, data)
        : await createLink(data);

      if (result.success) {
        toast.success(result.message);
        onSuccess?.();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error submitting link:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
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
              <FormLabel>
                Weapon Name <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter weapon designation" {...field} />
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
              <FormLabel>
                Target URL <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://target-destruction.com"
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
              <FormLabel>Destruction Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Optional battle details for your weapon"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="emoji"
          render={({ field }) => (
            <FormItem>
              <FormLabel>War Symbol</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <EmojiPickerComponent
                    onEmojiSelect={(emoji) => field.onChange(emoji)}
                    selectedEmoji={field.value}
                    theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                  />
                  {field.value && (
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      onClick={() => field.onChange("")}
                    >
                      Clear
                    </Button>
                  )}
                </div>
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
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Armed & Ready</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {editingLink ? "Upgrade Weapon" : "Deploy Weapon"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
