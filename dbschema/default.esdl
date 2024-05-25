using extension auth;

module default {
    scalar type Role extending enum<Admin, User>;

    global current_user := (
        assert_single(
            (select User filter .identity = global ext::auth::ClientTokenIdentity)
        )
    );

    abstract type Node {
        required created_at: datetime {
            default := datetime_current();
            readonly := true;
        };
        required updated_at: datetime {
            default := datetime_current();
            rewrite insert using (datetime_of_statement());
            rewrite update using (datetime_of_statement());
        };
    }

    abstract type Interaction extending Node {
        required author: User {
            default := global current_user;
        }
        reactions := .<node[is Reaction];
    }

    type User extending Node {
        required identity: ext::auth::Identity { 
            constraint exclusive;
        };

        required name: str;

        required role: Role {
            default := Role.User;
        };
        interactions := .<author[is Interaction];
    }

    type Category extending Node {
        required name: str;
        posts := .<category[is Post];
        comments := .<category[is Comment];
        required slug: str {
            constraint exclusive;
        }
        required allowed: Role {
            default := Role.User;
        };
    }

    type Post extending Interaction {
        required title: str;
        required content: str;
        required category: Category;
        required slug: str {
            constraint exclusive;
        };
        comments := .<post[is Comment];
    }

    type Comment extending Interaction {
        required content: str;
        required post: Post;
        required category: Category;
    }

    type Reaction extending Node {
        required author: User {
            default := global current_user;
        }
        required node: Interaction;
        required emoji: str;
    }
}