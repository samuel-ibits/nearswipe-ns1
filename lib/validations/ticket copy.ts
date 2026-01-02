import { z } from "zod";

export const ticketFormSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  description: z
    .string()
    .min(20, "Event description must be at least 20 characters"),
  privacy: z.enum(["public", "private"]),
  location: z.string().optional(),
  starttimestamp: z.string().min(1, "Event start date & time is required"),
  endtimestamp: z.string().optional(),
  isonline: z.boolean().optional(),
  meetlink: z.string().optional(),
  category: z.string().optional(),
  slug: z.string().min(1, "required"),
  image: z.custom<File | string | undefined | null>((val) => {
    if (!val) return true; // allow undefined or null
    if (typeof val === "string") return true;
    if (val instanceof File) return true;
    return false;
  }, "Invalid image file") as z.ZodType<File | string | undefined>,
});

export type EventFormData = z.infer<typeof ticketFormSchema>;
