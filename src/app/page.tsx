import { Button } from "@/components/ui/button";
import { handleSignout } from "@/lib/auth";
import { context } from "@/lib/context";
import { auth } from "@/lib/edgedb";
import { Client } from "edgedb";
import Link from "next/link";

const [client, setClient] = context<Client | null>(null);

export default async function Home() {
  const session = auth.getSession();
  const signedIn = await session.isSignedIn();

  setClient(session.client);
  console.log(await client()?.query("SELECT 1 + 5"));

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
