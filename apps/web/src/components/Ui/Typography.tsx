import { ElementType, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { PolymorphicProps } from "../types";

const typography = tv({
    base: "font-geist",
    variants: {
        size: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-2xl",
            "2xl": "text-3xl",
            "3xl": "text-4xl",
        },
        weight: {
            normal: "font-normal",
            medium: "font-medium",
            semiBold: "font-semibold",
            bold: "font-bold",
        },
        color: {
            default: "text-white",
            muted: "text-gray-400",
            subtle: "text-gray-300",
            primary: "text-blue-400",
            danger: "text-red-400",
        },
        tracking: {
            normal: "tracking-normal",
            wide: "tracking-wide",
        },
        break: {
            normal: "",
            all: "break-all",
        },
    },
    defaultVariants: {
        size: "sm",
        weight: "normal",
        color: "default",
        tracking: "normal",
        break: "normal",
    },
});

type TypographyProps<T extends ElementType> = PolymorphicProps<
    T,
    VariantProps<typeof typography> & {
        children?: ReactNode;
    }
>;

export const Typography = <T extends ElementType = "p">({
    as,
    size,
    weight,
    color,
    tracking,
    break: breakProp,
    className,
    children,
    ...props
}: TypographyProps<T>) => {
    const Component = as || "p";

    return (
        <Component
            className={typography({
                size,
                weight,
                color,
                tracking,
                break: breakProp,
                className,
            })}
            {...props}
        >
            {children}
        </Component>
    );
};
