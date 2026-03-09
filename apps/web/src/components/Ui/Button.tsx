import { ElementType, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { PolymorphicProps } from "../types";

const button = tv({
    base: "font-altone rounded-lg transition font-semibold inline-flex items-center justify-center",
    variants: {
        variant: {
            primary: "bg-primary text-zero hover:bg-primary-light",
            secondary: "bg-primary-light text-zero hover:bg-primary",
        },
        size: {
            md: "px-4 py-2",
            lg: "px-6 py-3",
        },
        disabled: {
            true: "cursor-not-allowed",
        },
    },

    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

type ButtonProps<T extends ElementType> = PolymorphicProps<
    T,
    VariantProps<typeof button> & {
        children?: ReactNode;
    }
>;

export const Button = <T extends ElementType = "button">({
    as,
    className,
    children,
    variant,
    size,
    disabled,
    ...props
}: ButtonProps<T>) => {
    const Component = as || "button";

    return (
        <Component
            className={button({
                variant,
                size,
                disabled,
                className,
            })}
            disabled={disabled}
            {...props}
        >
            {children}
        </Component>
    );
};

