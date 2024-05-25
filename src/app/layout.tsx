import "./globals.css";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Superstack",
    description: "Last generation forum made with next generation tools",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="absolute inset-0">
            <body className={cn(inter.className, "min-h-full flex flex-col")}>
                {children}
                <Toaster position="bottom-center" />
            </body>
        </html>
    );
}
