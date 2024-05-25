CREATE MIGRATION m1kaxl5ryqi6uy6hfculy6lbt24gqxwilps2izugthypbkzwpjcoxa
    ONTO m1euwn7emu3jhgikzsqznnkuarrumtztfjmpmo7pc36eiag2xewpma
{
  ALTER TYPE default::Reactable RENAME TO default::Interaction;
  ALTER TYPE default::Interaction {
      CREATE REQUIRED LINK author: default::User {
          SET default := (GLOBAL default::current_user);
      };
  };
  ALTER TYPE default::Comment {
      ALTER LINK author {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE default::Post {
      ALTER LINK author {
          RESET OPTIONALITY;
          DROP OWNED;
          RESET TYPE;
      };
  };
  ALTER TYPE default::User {
      CREATE LINK interactions := (.<author[IS default::Interaction]);
  };
};
