import z from "zod";

export const urlParamsSchema = z.object({
    code: z
        .string()
        .trim()
        .min(1)
        .max(10)
        .regex(/^[0-9A-Za-z]+$/),
});

export type UrlParamsSchema = z.infer<typeof urlParamsSchema>;

