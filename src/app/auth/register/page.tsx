import { auth } from "@/lib/edgedb";
import RegisterForm from "./register-form";

export default async function RegisterPage() {
    return (
        <RegisterForm
            githubHref={auth.getOAuthUrl("builtin::oauth_github")}
            discordHref={auth.getOAuthUrl("builtin::oauth_discord")}
        />
    );
}
