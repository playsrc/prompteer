import { Article } from "@mui/icons-material";
import { Button, Container, Divider, Stack, Typography } from "@mui/material";
import { useGo } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

export default function AboutPage() {
  const go = useGo();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Stack my={3} direction="row" justifyContent="space-between">
        <Link href="/" style={{ color: "unset", textDecoration: "none" }}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Article color="primary" fontSize="large" />
            <Typography fontSize="24px" fontWeight="500">
              Prompteer
            </Typography>
          </Stack>
        </Link>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Link href="/pricing" style={{ textDecoration: "none" }}>
            <Button variant="text">Pricing</Button>
          </Link>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <Button variant="text">About</Button>
          </Link>
          <Link
            href="https://github.com/mateusabelli/prompteer"
            style={{ textDecoration: "none" }}
          >
            <Button variant="text">GitHub</Button>
          </Link>

          <Divider />
          <Button
            variant="contained"
            onClick={() => {
              go({
                to: "/prompts",
                type: "push",
              });
            }}
          >
            Prompts
          </Button>
        </Stack>
      </Stack>
      <Stack direction="row" spacing={4} my={8} alignItems="center">
        <Stack spacing={4} maxWidth="900px" mx="auto">
          <Typography variant="h3" fontWeight="600" textAlign="center">
            Empowering Creativity through AI Prompts
          </Typography>
          <Typography>
            Welcome to Prompteer, a dynamic app where writers of all backgrounds
            can share and explore a world of original writing prompts. Our
            platform is dedicated to empowering individuals like you to spark
            creativity, inspire others, and embark on exciting writing journeys.
            <br />
            Join our diverse and supportive community today, and together, let's
            cultivate a space where every prompt has the potential to ignite
            captivating stories. Prompteer is your platform to express, connect,
            and collaborate, creating a tapestry of endless possibilities.
            Unleash your writing prompts and let the magic of storytelling
            unfold!
          </Typography>
        </Stack>
      </Stack>

      <Stack
        marginX="auto"
        maxWidth="900px"
        marginY={12}
        border="2px solid"
        borderRadius="8px"
        borderColor={(theme) => theme.palette.action.selected}
        bgcolor={(theme) => theme.palette.background.paper}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={8}
        py={4}
        spacing={2}
      >
        <Stack spacing={4} alignItems="center" width="100%" textAlign="center">
          <Typography fontWeight="500" fontSize="24px">
            Are you ready to unleash the full potential of your imagination?
            Look no further than Prompteer
          </Typography>
          <Button
            size="large"
            variant="contained"
            sx={{ marginX: "auto", width: "max-content" }}
            onClick={() => {
              go({
                to: "/prompts",
                type: "push",
              });
            }}
          >
            Start now
          </Button>
        </Stack>
      </Stack>

      <Divider variant="fullWidth" />
      <Stack
        my={3}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Article color="primary" />
          <Typography fontSize="18px" fontWeight="500">
            Prompteer
          </Typography>
        </Stack>
        <Typography sx={{ opacity: "0.8" }}>
          &#169; 2023 All rights reserved.
        </Typography>
      </Stack>
    </Container>
  );
}

AboutPage.noLayout = true;

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
