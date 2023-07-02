import { Button, Stack, Typography } from "@mui/material";
import { useGo } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export default function HomePage() {
  const go = useGo();
  return (
    <>
      <Typography variant="h2">Home</Typography>
      <Stack spacing={2} direction="row">
        <Button variant="text">
          <Link href="/pricing" style={{ textDecoration: "none" }}>
            Pricing
          </Link>
        </Button>
        <Button variant="text">
          <Link href="/about" style={{ textDecoration: "none" }}>
            About
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            go({
              to: "/dashboard",
              type: "push",
            });
          }}
        >
          Dashboard
        </Button>
      </Stack>
    </>
  );
}

HomePage.noLayout = true;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  return {
    props: {
      ...translateProps,
    },
  };
};
