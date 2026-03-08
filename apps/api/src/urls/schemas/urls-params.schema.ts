import z from "zod";

export const urlParamsSchema = z.object({
    code: z.string().trim().min(1).max(10),
});

export type UrlParamsSchema = z.infer<typeof urlParamsSchema>;

