CREATE MIGRATION m1k2o363qpqnzvxklyn5lktvbk5fhc2uoxo32iwsbpzupmfxpghw3a
    ONTO m1j5bboipsuyc5ltntvkbwyaxx4moyxfcu5xhkzq3xjf7lyeqdri7a
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  ALTER TYPE default::Account {
      DROP CONSTRAINT std::exclusive ON ((.provider, .providerAccountId));
      DROP PROPERTY userId;
  };
  ALTER TYPE default::User {
      DROP LINK accounts;
      DROP LINK sessions;
      DROP PROPERTY createdAt;
      DROP PROPERTY email;
      DROP PROPERTY emailVerified;
      DROP PROPERTY image;
      DROP PROPERTY name;
  };
  DROP TYPE default::Account;
  DROP TYPE default::Session;
  DROP TYPE default::User;
  DROP TYPE default::VerificationToken;
};
