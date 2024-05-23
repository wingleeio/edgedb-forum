import OnboardingForm from "./onboarding-form";
import { User } from "../../../../dbschema/interfaces";
import { auth } from "@/lib/edgedb";
import { redirect } from "next/navigation";

export default async function Onboarding() {
    const session = auth.getSession();
    let user: User | null = null;

    try {
        user = await session.client.queryRequiredSingle<User>(
            "select global current_user"
        );
    } catch (e) {}

    if (user) {
        redirect("/");
    }

    return <OnboardingForm />;
}
