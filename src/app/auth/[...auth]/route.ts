import { auth } from "@/lib/edgedb";
import { redirect } from "next/navigation";

export const { GET, POST } = auth.createAuthRouteHandlers({
  onOAuthCallback: async ({ error, tokenData }) => {
    redirect("/");
  },
  onEmailPasswordSignIn: async ({ error, tokenData }) => {
    redirect("/");
  },
  onEmailPasswordSignUp: async ({ error, tokenData }) => {
    redirect("/");
  },
  onMagicLinkCallback: async ({ error, tokenData }) => {
    redirect("/");
  },
  onSignout: () => {
    redirect("/");
  },
});
