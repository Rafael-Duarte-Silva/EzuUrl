import { Geist } from "next/font/google";
import type { Metadata } from "next";
import "../styles/globals.css";
import { ReactQueryProvider } from "../providers/QueryClientProvider";

export const metadata: Metadata = {
    title: "EzuUrl",
    description: "",
};

const geist = Geist({
    subsets: ["latin"],
    variable: "--font-geist",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={`${geist.className} ${geist.variable} antialiased`}
            >
                <ReactQueryProvider>{children}</ReactQueryProvider>
            </body>
        </html>
    );
}
