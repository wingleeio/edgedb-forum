import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { User } from "@/dbschema/interfaces";
import { auth } from "@/lib/edgedb";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface NavigationItem {
    name: string;
    href: string;
}

const NAVIGATION_ITEMS: NavigationItem[] = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
    },
    {
        name: "Moderation (TBD)",
        href: "#",
    },
];

export default async function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        return redirect("/");
    }

    let user: User | null = null;

    try {
        user = await session.client.queryRequiredSingle<User>(
            "select global current_user { * }"
        );
    } catch (e) {}

    if (!user) {
        redirect("/account/onboarding");
    }

    if (user.role !== "Admin") {
        redirect("/");
    }

    const url = headers().get("x-url") || "";
    const pathname = new URL(url).pathname;

    return (
        <div className="flex min-h-screen w-full flex-col">
            <header className="sticky top-0 h-20 border-b bg-background px-4 md:px-6">
                <div className="max-w-6xl flex gap-4 items-center h-full mx-auto">
                    <nav className="hidden flex-col gap-6 h-full text-sm md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                        <Link
                            href="#"
                            className="flex items-center text-lg md:text-base mr-12"
                        >
                            <img
                                className="h-8 min-w-8"
                                src="/logo.svg"
                                alt="my logo"
                            />
                            <span className="sr-only">Superstack</span>
                        </Link>
                        {NAVIGATION_ITEMS.map((item, i) => {
                            const ACTIVE = item.href === pathname;
                            return (
                                <Link
                                    key={i}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center h-full text-muted-foreground transition-colors px-2",
                                        ACTIVE &&
                                            "text-indigo-500 font-medium border-b-[2px] border-solid border-indigo-500",
                                        !ACTIVE && "hover:text-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <img
                                        className="h-8 min-w-8"
                                        src="/logo.svg"
                                        alt="my logo"
                                    />
                                    <span className="sr-only">Superstack</span>
                                </Link>
                                {NAVIGATION_ITEMS.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>
            <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
                <div className="mx-auto w-full max-w-6xl">{children}</div>
            </main>
        </div>
    );
}
