import LoginForm from "./login-form";
import { auth } from "@/lib/edgedb";

export default async function Login() {
    return (
        <LoginForm
            githubHref={auth.getOAuthUrl("builtin::oauth_github")}
            discordHref={auth.getOAuthUrl("builtin::oauth_discord")}
        />
    );
}
