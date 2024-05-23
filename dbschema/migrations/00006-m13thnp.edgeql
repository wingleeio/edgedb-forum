CREATE MIGRATION m13thnpd2krozrx6bklw2skc2czif7z2q74djrgrm4fgocmcr63msa
    ONTO m1g5lx3sv7azlns2vhxrwiiwyofdhskfwlfjytvvoli67g3cizxhia
{
  CREATE GLOBAL default::onboarded := (EXISTS ((SELECT
      GLOBAL default::current_user
  )));
};
