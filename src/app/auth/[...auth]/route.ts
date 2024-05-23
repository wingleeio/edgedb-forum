import { auth } from "@/lib/edgedb";
import { redirect } from "next/navigation";

export const { GET, POST } = auth.createAuthRouteHandlers({
  onEmailVerify: async () => {
    redirect("/account/onboarding");
  },
  onOAuthCallback({ error, tokenData, isSignUp }) {
    if (isSignUp) {
      redirect("/account/onboarding");
    }

    redirect("/");
  },
});
