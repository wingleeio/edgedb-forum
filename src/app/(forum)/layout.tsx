import { MessageCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@/dbschema/interfaces";
import { handleSignout } from "@/lib/auth";
import { auth } from "@/lib/edgedb";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCategories } from "../shared.actions";

export default async function ForumLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    let user: User | null = null;

    if (signedIn) {
        try {
            user = await session.client.queryRequiredSingle<User>(
                "select global current_user { * }"
            );
        } catch (e) {
            redirect("/account/onboarding");
        }
    }

    const categories = await getCategories();

    return (
        <div>
            <header className="h-20 border-b bg-background px-4 md:px-6">
                <div className="max-w-6xl flex gap-4 items-center h-full mx-auto">
                    <nav className="h-full flex flex-row items-center gap-6 w-full">
                        <Link
                            href="#"
                            className="flex items-center text-lg md:text-base mr-12 gap-4 font-semibold"
                        >
                            <img
                                className="h-8 min-w-8"
                                src="/logo.svg"
                                alt="my logo"
                            />
                            <span>EdgeDB Forum</span>
                        </Link>
                        <div className="flex flex-grow justify-end gap-2">
                            {signedIn && (
                                <form
                                    action={async () => {
                                        "use server";
                                        await handleSignout();
                                    }}
                                >
                                    <Button>Logout</Button>
                                </form>
                            )}
                            {!signedIn && (
                                <>
                                    <Link href="/auth/login">
                                        <Button variant="outline">Login</Button>
                                    </Link>
                                    <Link href="/auth/register">
                                        <Button>Register</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
            <div className="max-w-6xl mx-auto flex gap-6 py-8 px-4 flex-col-reverse md:flex-row">
                <div className="w-full md:w-[250px]">
                    {signedIn && (
                        <Link href="/new">
                            <Button size="sm" className="w-full mb-6">
                                Start a Conversation
                            </Button>
                        </Link>
                    )}
                    <div className="flex flex-col gap-2">
                        <Link href="/">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="flex gap-2 items-center justify-start w-full"
                            >
                                <MessageCircle className="h-5 w-5" /> All
                                Discussions
                            </Button>
                        </Link>

                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/c/${category.slug}`}
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex gap-2 items-center justify-between w-full"
                                >
                                    {category.name}{" "}
                                    <Badge>{category.post_count}</Badge>
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex-grow">{children}</div>
            </div>
        </div>
    );
}
