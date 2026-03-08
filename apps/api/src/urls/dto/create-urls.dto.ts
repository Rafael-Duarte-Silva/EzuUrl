import { z } from "zod";

export const createUrlSchema = z.object({
    long_url: z.string().trim().min(5).max(1000),
});

export type CreateUrlDTO = z.infer<typeof createUrlSchema>;

