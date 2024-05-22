import { auth } from "@/lib/edgedb";
import { redirect } from "next/navigation";

export const { GET, POST } = auth.createAuthRouteHandlers({
  onEmailVerify: async () => {
    redirect("/");
  },
});
