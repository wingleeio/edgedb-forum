import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "../../dbschema/interfaces";
import { auth } from "@/lib/edgedb";
import { handleSignout } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = auth.getSession();

    const signedIn = await session.isSignedIn();

    if (signedIn) {
        try {
            await session.client.queryRequiredSingle<User>(
                "select global current_user"
            );
        } catch (e) {
            redirect("/account/onboarding");
        }
    }

    return (
        <div className="flex p-4 gap-2">
            {signedIn ? (
                <form
                    action={async () => {
                        "use server";
                        await handleSignout();
                    }}
                >
                    <Button>Logout</Button>
                </form>
            ) : (
                <>
                    <Link href="/auth/login">
                        <Button>Login</Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button>Register</Button>
                    </Link>
                </>
            )}
        </div>
    );
}
