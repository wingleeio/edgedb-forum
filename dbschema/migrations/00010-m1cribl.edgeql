CREATE MIGRATION m1cribluwjnxxykp3yaf3uvzma4y7x2xiasp7x7mz4o75nxrxdj4dq
    ONTO m1kaxl5ryqi6uy6hfculy6lbt24gqxwilps2izugthypbkzwpjcoxa
{
  ALTER TYPE default::Comment {
      CREATE REQUIRED LINK category: default::Category {
          SET REQUIRED USING (<default::Category>{});
      };
  };
  ALTER TYPE default::Category {
      CREATE LINK comments := (.<category[IS default::Comment]);
  };
};
