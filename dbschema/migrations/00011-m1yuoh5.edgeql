CREATE MIGRATION m1yuoh5amlwjn3rhupvlyonrqfviquzsr4qcqnwdjdj3jo4zhi4zfq
    ONTO m1cribluwjnxxykp3yaf3uvzma4y7x2xiasp7x7mz4o75nxrxdj4dq
{
  ALTER TYPE default::Category {
      CREATE REQUIRED PROPERTY allowed: default::Role {
          SET default := (default::Role.User);
      };
  };
};
