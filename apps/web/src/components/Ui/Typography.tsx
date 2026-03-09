import { ElementType, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { PolymorphicProps } from "../types";

const typography = tv({
    base: "font-geist",
    variants: {
        size: {
            sm: "text-sm",
            md: "text-md",
            xl: "text-3xl",
        },
        weight: {
            medium: "font-medium",
            semiBold: "font-semibold",
            bold: "font-bold",
        },
    },
    defaultVariants: {
        size: "sm",
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
                className,
            })}
            {...props}
        >
            {children}
        </Component>
    );
};

