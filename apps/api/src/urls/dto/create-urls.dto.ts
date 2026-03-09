import { z } from "zod";

export const createUrlSchema = z.object({
    longUrl: z.url().trim().min(10).max(1000),
});

export type CreateUrlDTO = z.infer<typeof createUrlSchema>;

