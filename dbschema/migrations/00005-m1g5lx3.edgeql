CREATE MIGRATION m1g5lx3sv7azlns2vhxrwiiwyofdhskfwlfjytvvoli67g3cizxhia
    ONTO m1k2o363qpqnzvxklyn5lktvbk5fhc2uoxo32iwsbpzupmfxpghw3a
{
  CREATE ABSTRACT TYPE default::Node {
      CREATE REQUIRED PROPERTY created_at: std::datetime {
          SET default := (std::datetime_current());
          SET readonly := true;
      };
      CREATE REQUIRED PROPERTY updated_at: std::datetime {
          SET default := (std::datetime_current());
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  CREATE SCALAR TYPE default::Role EXTENDING enum<Admin, User>;
  CREATE TYPE default::User EXTENDING default::Node {
      CREATE REQUIRED LINK identity: ext::auth::Identity {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name: std::str;
      CREATE REQUIRED PROPERTY role: default::Role {
          SET default := (default::Role.User);
      };
  };
  CREATE GLOBAL default::current_user := (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
