import { Article, GitHub } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { AuthPage } from "@refinedev/mui";

import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { ReactNode } from "react";

export default function Login() {
  return (
    <AuthPage
      type="login"
      rememberMe={false}
      forgotPasswordLink={false}
      registerLink={false}
      title={
        <Link href="/" style={{ color: "unset", textDecoration: "none" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Article fontSize="large" color="primary" />
            <Typography fontSize="24px" fontWeight="500">
              Prompteer
            </Typography>
          </Stack>
        </Link>
      }
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
      renderContent={(content: ReactNode, title: ReactNode) => (
        <>
          {title}
          {content}
          <Typography>Please sign in with GitHub or Discord</Typography>
          <Typography>Email sign in is not working at the moment.</Typography>
        </>
      )}
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
