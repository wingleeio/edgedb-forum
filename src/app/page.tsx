import { Button } from "@/components/ui/button";
import { handleSignout } from "@/lib/auth";
import { auth } from "@/lib/edgedb";
import Link from "next/link";

export default async function Home() {
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();
  return (
    <div>
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
        </>
      )}
    </div>
  );
}
