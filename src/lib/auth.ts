"use server";

import { auth } from "./edgedb";

export const {
  signout,
  emailPasswordSignIn,
  emailPasswordSendPasswordResetEmail,
  emailPasswordResendVerificationEmail,
  emailPasswordResetPassword,
  emailPasswordSignUp,
  magicLinkSignIn,
  magicLinkSignUp,
} = auth.createServerActions();
