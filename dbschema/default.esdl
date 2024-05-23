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

    type User extending Node {
        required identity: ext::auth::Identity { 
            constraint exclusive;
        };

        required name: str;

        required role: Role {
            default := Role.User;
        };
    }
}