"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlMutateSchema, urlMutateSchema } from "../schemas/urlMutateSchema";
import { postUrl } from "../services/urlsService";
import { LinkIcon } from "../components/icons/LinkIcon";
import { Typography } from "../components/Ui/Typography";
import { Button } from "../components/Ui/Button";
import { Input } from "../components/Ui/Input";

export default function HomePage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UrlMutateSchema>({
        resolver: zodResolver(urlMutateSchema),
    });

    const { data, mutate, isPending } = useMutation({
        mutationFn: async (data: UrlMutateSchema) => {
            const response = await postUrl({ data });

            return response.headers.location;
        },
    });

    const onSubmit = (data: UrlMutateSchema) => {
        mutate(data);
    };

    const shortUrl = `${process.env.NEXT_PUBLIC_API_URL}${data || "/..."}`;

    return (
        <div className="min-h-screen bg-linear-to-br from-primary via-primary-light to-secondary flex flex-col">
            <header className="p-6 flex gap-2">
                <LinkIcon className="w-8 h-auto" />
                <Typography
                    as="h1"
                    size="xl"
                    weight="bold"
                    className="text-zero"
                >
                    EzuUrl
                </Typography>
            </header>

            <main className="px-2 flex flex-1 items-center justify-center">
                <div className="bg-zero p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-xl">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <Input
                            id="url"
                            label="Cole sua URL longa"
                            placeholder="https://exemplo.com/minha-url-muito-grande"
                            {...register("longUrl")}
                            error={errors.longUrl?.message}
                        />

                        <Button
                            type="submit"
                            size="lg"
                            variant="primary"
                            disabled={isPending}
                        >
                            {isPending ? "Encurtando..." : "Encurtar URL"}
                        </Button>
                    </form>

                    {shortUrl && (
                        <div className="mt-6 border border-secondary rounded-lg p-4 flex justify-between items-center gap-2">
                            <Typography
                                as="span"
                                size="sm"
                                weight="medium"
                                className="text-primary break-all"
                            >
                                {shortUrl}
                            </Typography>

                            <Button
                                type="submit"
                                size="md"
                                variant="secondary"
                                onClick={() =>
                                    navigator.clipboard.writeText(shortUrl)
                                }
                            >
                                Copiar
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
