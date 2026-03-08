import { Geist } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "",
    description: "",
};

const geist = Geist({
    subsets: ["latin"],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body className={`${geist.className} antialiased`}>{children}</body>
        </html>
    );
}
