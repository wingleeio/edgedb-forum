import { getCategories } from "@/app/shared.actions";
import { User } from "@/dbschema/interfaces";
import { auth } from "@/lib/edgedb";
import { redirect } from "next/navigation";
import { NewPostForm } from "./new-post-form";

export default async function New() {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        return redirect("/");
    }

    const user = await session.client.queryRequiredSingle<User>(
        "select global current_user { * }"
    );

    const categories = await getCategories();

    const allowedCategories = categories.filter((category) => {
        if (category.allowed === "Admin") {
            return user.role === "Admin";
        }
        return true;
    });

    return <NewPostForm categories={allowedCategories} />;
}
