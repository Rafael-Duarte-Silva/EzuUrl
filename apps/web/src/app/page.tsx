"use client";

import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UrlMutateSchema, urlMutateSchema } from "../schemas/urlMutateSchema";
import { postUrl } from "../services/urlsService";
import { LinkIcon } from "../components/icons/LinkIcon";
import { BackgroundBeams } from "../components/Ui/BackgroundBeams";
import { useState } from "react";
import { Button } from "../components/Ui/Button";
import { Input } from "../components/Ui/Input";
import { Typography } from "../components/Ui/Typography";

export default function HomePage() {
    const [isCopy, setIsCopy] = useState(false);
    const [shortUrl, setShortUrl] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UrlMutateSchema>({
        resolver: zodResolver(urlMutateSchema),
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UrlMutateSchema) => {
            const response = await postUrl({ data });
            return response.headers.location;
        },
        onSuccess: (data) => {
            setShortUrl(`${process.env.NEXT_PUBLIC_API_URL}${data}`);
            setIsCopy(false);
        },
    });

    const onSubmit = (data: UrlMutateSchema) => {
        mutate(data);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden">
            <BackgroundBeams />

            <header className="absolute top-0 left-0 w-full p-6 flex items-center gap-4 z-10">
                <LinkIcon className="w-8 h-auto" />
                <Typography
                    as="h1"
                    size="2xl"
                    weight="bold"
                    tracking="wide"
                >
                    EzuUrl
                </Typography>
            </header>

            <main className="z-10 w-full max-w-xl px-4">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8">
                    <div className="mb-6">
                        <Typography
                            as="h2"
                            size="xl"
                            weight="semiBold"
                        >
                            Encurtador de URL
                        </Typography>
                        <Typography
                            size="sm"
                            color="muted"
                        >
                            Transforme links longos em URLs curtas e elegantes
                        </Typography>
                    </div>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <Input
                            id="url"
                            placeholder="https://exemplo.com/minha-url-muito-grande"
                            {...register("longUrl")}
                            error={errors.longUrl?.message}
                        />

                        <Button
                            type="submit"
                            disabled={isPending}
                            size="lg"
                            className="w-full"
                        >
                            Encurtar URL
                        </Button>
                    </form>

                    {shortUrl && (
                        <div className="mt-6 flex items-center justify-between gap-3 bg-black/40 border border-white/10 rounded-lg p-4">
                            <Typography
                                size="sm"
                                color="primary"
                                break="all"
                            >
                                {shortUrl}
                            </Typography>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                    navigator.clipboard.writeText(shortUrl);
                                    setIsCopy(true);
                                }}
                            >
                                {isCopy ? "copiado" : "copiar"}
                            </Button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
