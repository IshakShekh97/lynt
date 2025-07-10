import * as z from "zod";

// Schema for sign in form
export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

// Schema for sign up form
export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must not exceed 50 characters" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(30, { message: "Username must not exceed 30 characters" })
      .regex(/^[a-z0-9_-]+$/i, {
        message:
          "Username can only contain letters, numbers, underscores and hyphens",
      }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const linkSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title must not exceed 100 characters" }),
  url: z
    .string()
    .min(1, { message: "URL is required" })
    .url({ message: "Please enter a valid URL" }),
  description: z
    .string()
    .max(200, { message: "Description must not exceed 200 characters" })
    .optional(),
  emoji: z.string().optional(),
  thumbnail: z.string().optional(),
  isActive: z.boolean(),
});

export type LinkFormValues = z.infer<typeof linkSchema>;

// Schema for link reordering
export const linkReorderSchema = z.object({
  linkId: z.string().min(1, { message: "Link ID is required" }),
  newOrder: z.number().min(0, { message: "Order must be a positive number" }),
});

export type LinkReorderValues = z.infer<typeof linkReorderSchema>;
