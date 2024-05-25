CREATE MIGRATION m1vuj2wcpr2rqpd5h45vcihspvowd4l5xosokeele2hg5nb2x6rm2q
    ONTO m1yuoh5amlwjn3rhupvlyonrqfviquzsr4qcqnwdjdj3jo4zhi4zfq
{
  ALTER TYPE default::Category {
      CREATE REQUIRED PROPERTY slug: std::str {
          SET REQUIRED USING (<std::str>.name);
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
