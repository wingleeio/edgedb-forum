"use server";

import { auth } from "./edgedb";
import { redirect } from "next/navigation";

const {
    signout,
    emailPasswordSignIn,
    emailPasswordSendPasswordResetEmail,
    emailPasswordResendVerificationEmail,
    emailPasswordResetPassword,
    emailPasswordSignUp,
    magicLinkSignIn,
    magicLinkSignUp,
} = auth.createServerActions();

export const handleSignout = async () => {
    await signout();

    redirect("/");
};

export const handleEmailPasswordSignIn = async (
    ...args: Parameters<typeof emailPasswordSignIn>
) => {
    await emailPasswordSignIn(...args);

    redirect("/");
};

export const handleEmailPasswordSignUp = async (
    ...args: Parameters<typeof emailPasswordSignUp>
) => {
    await emailPasswordSignUp(...args);

    redirect("/auth/verify-email");
};
