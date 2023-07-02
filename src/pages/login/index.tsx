import { AuthPage } from "@refinedev/mui";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Login() {
  return (
    <AuthPage
      type="login"
      providers={[
        {
          name: "github",
          label: "with GitHub",
        },
        {
          name: "discord",
          label: "with Discord",
        },
      ]}
    />
  );
}

Login.noLayout = true;

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  return {
    props: {
      ...translateProps,
    },
  };
};
