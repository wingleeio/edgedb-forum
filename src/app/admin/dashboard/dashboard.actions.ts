"use server";

import { Role, User } from "@/dbschema/interfaces";
import { auth } from "@/lib/edgedb";
import { redirect } from "next/navigation";

const CREATE_CATEGORY_QUERY = `
    insert Category {
        name := <str>$name,
        slug := <str>$slug,
        allowed := <str>$allowed,
    }
`;

const UPDATE_CATEGORY_QUERY = `
    update Category
    filter .id = <uuid>$id
    set {
        name := <str>$name,
        slug := <str>$slug,
        allowed := <str>$allowed,
    }
`;

export async function createCategory({
    name,
    slug,
    allowed,
}: {
    name: string;
    slug: string;
    allowed: Role;
}) {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        redirect("/auth/login");
    }

    const user = await session.client.queryRequiredSingle<User>(
        "select global current_user { * }"
    );

    if (user.role !== "Admin") {
        redirect("/");
    }

    await session.client.query(CREATE_CATEGORY_QUERY, {
        name,
        slug,
        allowed,
    });
}

export async function updateCategory(
    id: string,
    {
        name,
        slug,
        allowed,
    }: {
        name: string;
        slug: string;
        allowed: Role;
    }
) {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        redirect("/auth/login");
    }

    const user = await session.client.queryRequiredSingle<User>(
        "select global current_user { * }"
    );

    if (user.role !== "Admin") {
        redirect("/");
    }

    await session.client.query(UPDATE_CATEGORY_QUERY, {
        id,
        name,
        slug,
        allowed,
    });
}
