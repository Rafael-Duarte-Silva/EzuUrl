import { InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { Typography } from "./Typography";

const input = tv({
    base: "w-full px-4 py-3 text-sm rounded-lg bg-black/40 border outline-none transition-all",
    variants: {
        variant: {
            default:
                "border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            error: "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400",
        },
    },
    defaultVariants: {
        variant: "default",
    },
});

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    error?: string;
};

export const Input = ({
    label,
    error,
    id,
    className,
    ...props
}: InputProps) => {
    const variant = error ? "error" : "default";

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <Typography
                    as="label"
                    htmlFor={id}
                    size="sm"
                    className="text-gray-300"
                >
                    {label}
                </Typography>
            )}

            <input
                id={id}
                className={input({
                    variant,
                    className,
                })}
                {...props}
            />

            {error && (
                <Typography
                    as="span"
                    size="xs"
                    className="text-red-400"
                >
                    {error}
                </Typography>
            )}
        </div>
    );
};

