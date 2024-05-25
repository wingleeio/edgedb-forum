import { Category } from "@/dbschema/interfaces";
import { client } from "@/lib/edgedb";

const GET_CATEGORIES = `
    select Category {
        id,
        name,
        slug,
        allowed,
        post_count := count(.posts),
        comment_count := count(.comments),
    }
    order by .created_at;
`;

export async function getCategories() {
    return client.query<
        Category & {
            post_count: number;
            comment_count: number;
        }
    >(GET_CATEGORIES);
}
