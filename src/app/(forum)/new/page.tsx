import { NewPostForm } from "./new-post-form";
import { auth } from "@/lib/edgedb";
import { getCategories } from "@/app/shared.actions";
import { redirect } from "next/navigation";

export default async function New() {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        return redirect("/");
    }

    const categories = await getCategories();

    return <NewPostForm categories={categories} />;
}
