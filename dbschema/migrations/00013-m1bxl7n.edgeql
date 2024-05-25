CREATE MIGRATION m1bxl7nulsleeetqae44vtc6keu3douofw3a27ian5xj4r4awzm47q
    ONTO m1vuj2wcpr2rqpd5h45vcihspvowd4l5xosokeele2hg5nb2x6rm2q
{
  ALTER TYPE default::Post {
      CREATE REQUIRED PROPERTY slug: std::str {
          SET REQUIRED USING (<std::str>{});
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
