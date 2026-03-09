import { InputHTMLAttributes } from "react";
import { tv } from "tailwind-variants";
import { Typography } from "./Typography";

const input = tv({
    base: "px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition",
    variants: {
        variant: {
            default: "border-secondary focus:ring-primary-light",
            error: "border-red-400 focus:ring-red-400",
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
                    size="md"
                    weight="semiBold"
                    className="text-primary"
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
                    size="sm"
                    className="text-red-500"
                >
                    {error}
                </Typography>
            )}
        </div>
    );
};
