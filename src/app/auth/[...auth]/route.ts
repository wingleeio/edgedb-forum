import { auth } from "@/util/edgedb";
import { redirect } from "next/navigation";

export const { GET, POST } = auth.createAuthRouteHandlers({
  onBuiltinUICallback: async ({ error, tokenData, isSignUp }) => {
    if (error) {
      console.error("sign in failed", error);
    }

    redirect("/");
  },
  onSignout: () => {
    redirect("/");
  },
});
