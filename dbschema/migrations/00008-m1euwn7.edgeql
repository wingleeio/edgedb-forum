CREATE MIGRATION m1euwn7emu3jhgikzsqznnkuarrumtztfjmpmo7pc36eiag2xewpma
    ONTO m1zwqggxm4yzjq22gonraer4bjdfrb4xiwu5cxvjlqunc2put34qwq
{
  CREATE TYPE default::Category EXTENDING default::Node {
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE ABSTRACT TYPE default::Reactable EXTENDING default::Node;
  CREATE TYPE default::Post EXTENDING default::Reactable {
      CREATE REQUIRED LINK category: default::Category;
      CREATE REQUIRED LINK author: default::User {
          SET default := (GLOBAL default::current_user);
      };
      CREATE REQUIRED PROPERTY content: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
  };
  ALTER TYPE default::Category {
      CREATE LINK posts := (.<category[IS default::Post]);
  };
  CREATE TYPE default::Reaction EXTENDING default::Node {
      CREATE REQUIRED LINK node: default::Reactable;
      CREATE REQUIRED LINK author: default::User {
          SET default := (GLOBAL default::current_user);
      };
      CREATE REQUIRED PROPERTY emoji: std::str;
  };
  ALTER TYPE default::Reactable {
      CREATE LINK reactions := (.<node[IS default::Reaction]);
  };
  CREATE TYPE default::Comment EXTENDING default::Reactable {
      CREATE REQUIRED LINK author: default::User {
          SET default := (GLOBAL default::current_user);
      };
      CREATE REQUIRED LINK post: default::Post;
      CREATE REQUIRED PROPERTY content: std::str;
  };
  ALTER TYPE default::Post {
      CREATE LINK comments := (.<post[IS default::Comment]);
  };
};
