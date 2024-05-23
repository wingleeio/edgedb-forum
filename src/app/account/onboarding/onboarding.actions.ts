"use server";

import { auth } from "@/lib/edgedb";
import { redirect } from "next/navigation";

const ONBOARDING_QUERY = `
    insert User {
        name := <str>$name,
        identity := (global ext::auth::ClientTokenIdentity)
    }
`;

export const handleOnboarding = async (name: string) => {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        redirect("/auth/login");
    }

    await session.client.query(ONBOARDING_QUERY, {
        name,
    });

    redirect("/");
};
