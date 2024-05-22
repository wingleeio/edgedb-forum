"use server";

import { EdgeDBAuthError } from "@edgedb/auth-nextjs/app";
import { redirect } from "next/navigation";
import { auth } from "./edgedb";

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
  try {
    await signout();
  } catch (e) {
    if (e instanceof EdgeDBAuthError) {
      throw e;
    }
  }

  redirect("/");
};

export const handleEmailPasswordSignIn = async (...args: Parameters<typeof emailPasswordSignIn>) => {
  try {
    await emailPasswordSignIn(...args);
  } catch (e) {
    if (e instanceof EdgeDBAuthError) {
      throw e;
    }
  }

  redirect("/");
};

export const handleEmailPasswordSignUp = async (...args: Parameters<typeof emailPasswordSignUp>) => {
  try {
    await emailPasswordSignUp(...args);
  } catch (e) {
    if (e instanceof EdgeDBAuthError) {
      throw e;
    }
  }

  redirect("/auth/verify-email");
};
