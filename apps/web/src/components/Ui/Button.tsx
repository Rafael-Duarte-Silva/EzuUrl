import { ElementType, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { PolymorphicProps } from "../types";

const button = tv({
    base: "font-geist transition-all font-medium inline-flex items-center justify-center select-none",
    variants: {
        variant: {
            primary:
                "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30",
            ghost: "bg-white/10 text-white hover:bg-white/20",
        },
        size: {
            sm: "text-xs px-3 py-2",
            md: "text-sm px-4 py-2",
            lg: "text-sm px-6 py-3",
        },
        radius: {
            md: "rounded-md",
            lg: "rounded-lg",
        },
        disabled: {
            true: "opacity-50 cursor-not-allowed hover:none",
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        radius: "lg",
    },
});

type ButtonProps<T extends ElementType> = PolymorphicProps<
    T,
    VariantProps<typeof button> & {
        children?: ReactNode;
        isLoading?: boolean;
        isCopied?: boolean;
    }
>;

export const Button = <T extends ElementType = "button">({
    as,
    className,
    children,
    variant,
    size,
    radius,
    disabled,
    isLoading,
    isCopied,
    ...props
}: ButtonProps<T>) => {
    const Component = as || "button";

    const isDisabled = disabled || isLoading;

    return (
        <Component
            className={button({
                variant,
                size,
                radius,
                disabled: isDisabled,
                className,
            })}
            disabled={isDisabled}
            {...props}
        >
            {isLoading ? "Encurtando..." : isCopied ? "Copiado" : children}
        </Component>
    );
};

