import { z } from "zod";

// Zod schemas for validation
export const createLinkSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  url: z.string().url("Please enter a valid URL"),
  description: z
    .string()
    .max(200, "Description must be less than 200 characters")
    .optional()
    .transform((val) => val || undefined),
  iconUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val)),
  emoji: z
    .string()
    .optional()
    .transform((val) => val || undefined),
});

export const updateLinkSchema = createLinkSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const reorderLinksSchema = z.object({
  linkIds: z.array(z.string().min(1)),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
export type ReorderLinksInput = z.infer<typeof reorderLinksSchema>;
