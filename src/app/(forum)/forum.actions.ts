"use server";

import { Comment, Post } from "@/dbschema/interfaces";
import { auth, client } from "@/lib/edgedb";
import { redirect } from "next/navigation";

const GET_POSTS_QUERY = `
  with
    posts := (
      select Post
      order by .created_at desc
      offset <int32>$offset limit <int32>$limit
    ),
    total := count(Post)
  select {
    posts := posts {
        id,
        title,
        slug,
        created_at,
        category: {
          id,
          name,
        },
        author: {
          id,
          name,
        }
    },
    total := total
  }
`;

export const getPosts = async (params: { page: number; limit: number }) => {
    const posts = await client.queryRequiredSingle<{
        posts: Post[];
        total: number;
    }>(GET_POSTS_QUERY, {
        offset: params.page * params.limit,
        limit: params.limit,
    });

    return posts;
};

const GET_POST_QUERY = `
  with
    post := (
      select Post
      filter .slug = <str>$slug
    ),
    comments := (
      select Comment
      filter .post = post
      order by .created_at asc
      offset <int32>$offset limit <int32>$limit
    ),
    total := count((select Comment filter .post = post))
  select {
    post := post {
      id,
      title,
      slug,
      created_at,
      content,
      category: {
        id,
        name,
      },
      author: {
        id,
        name,
      }
    },
    comments := comments {
      id,
      content,
      created_at,
      author: {
        id,
        name,
      }
    },
    total := total
  }
`;

export const getPost = async (
    slug: string,
    params: { page: number; limit: number }
) => {
    const post = await client.queryRequiredSingle<{
        post: Post;
        comments: Comment[];
        total: number;
    }>(GET_POST_QUERY, {
        slug,
        offset: params.page * params.limit,
        limit: params.limit,
    });

    return post;
};

const GET_POSTS_QUERY_FOR_CAT = `
  with
    posts := (
      select Post
      filter .category.slug = <str>$category_slug
      order by .created_at desc
      offset <int32>$offset limit <int32>$limit
    ),
    total := count((select Post filter .category.slug = <str>$category_slug))
  select {
    posts := posts {
        id,
        title,
        slug,
        created_at,
        category: {
          id,
          name,
        },
        author: {
          id,
          name,
        }
    },
    total := total
  }
`;

export const getPostsForCat = async (
    category: string,
    params: { page: number; limit: number }
) => {
    const posts = await client.queryRequiredSingle<{
        posts: Post[];
        total: number;
    }>(GET_POSTS_QUERY_FOR_CAT, {
        category_slug: category,
        offset: params.page * params.limit,
        limit: params.limit,
    });

    return posts;
};

const CREATE_COMMENT_QUERY = `
  insert Comment {
    content := <str>$content,
    post := <Post><uuid>$post,
    category := <Category><uuid>$category
  }
`;

export const createComment = async (data: {
    category: string;
    post: string;
    content: string;
}) => {
    const session = auth.getSession();
    const signedIn = await session.isSignedIn();

    if (!signedIn) {
        redirect("/auth/login");
    }

    await session.client.query(CREATE_COMMENT_QUERY, data);
};
