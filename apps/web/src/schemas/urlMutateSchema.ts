import { z } from "zod";

export const urlMutateSchema = z.object({
    longUrl: z
        .string()
        .trim()
        .transform((url) => {
            const HTTTPS_REGEX = /^https?:\/\//i;
            if (!HTTTPS_REGEX.test(url)) {
                return `https://${url}`;
            }

            return url;
        })
        .pipe(z.url("Digite uma URL válida").trim().min(10).max(1000)),
});

export type UrlMutateSchema = z.infer<typeof urlMutateSchema>;

