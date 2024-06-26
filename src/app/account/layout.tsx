import type { Metadata } from "next";
import { User } from "../../../dbschema/interfaces";
import { auth } from "@/lib/edgedb";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";

export default async function AccountLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        redirect("/auth/login");
    }

    return (
        <div
            className={cn(
                "flex justify-center items-center flex-1 relative p-4"
            )}
        >
            <div className="absolute inset-0 ">
                <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#424242_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            </div>
            {children}
        </div>
    );
}
