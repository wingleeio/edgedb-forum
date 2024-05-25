"use server";

import { Post } from "@/dbschema/interfaces";
import { auth } from "@/lib/edgedb";
import { redirect } from "next/navigation";

const CREATE_POST_QUERY = `
    with
        posts := (select Post filter .title ilike <str>$title),
        post_count := count(posts),
        new_slug := <str>$slug ++ '-' ++ <str>post_count
    select (insert Post {
        title := <str>$title,
        content := <str>$content,
        category := <Category><uuid>$category,
        slug := if post_count > 0 then new_slug else <str>$slug
    }) {
      id,
      slug
    }
`;

export const createPost = async (data: {
    category: string;
    title: string;
    content: string;
}) => {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        redirect("/auth/login");
    }

    const slug = data.title.toLowerCase().replace(/\s/g, "-");

    const post = await session.client.queryRequiredSingle<Post>(
        CREATE_POST_QUERY,
        {
            ...data,
            slug,
        }
    );

    redirect("/p/" + post.slug);
};
