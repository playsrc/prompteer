import { Article } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useGo } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const go = useGo();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <Container>
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
      <Stack direction="row" spacing={4} my={8}>
        <Stack spacing={4}>
          <Typography variant="h3" fontWeight="600">
            AI Prompts & Engaging Comments
          </Typography>
          <Typography sx={{ opacity: "0.8" }}>
            Welcome to Prompteer, a thriving community where you share AI
            prompts, get feedback, and embrace collective inspiration. Connect
            with writers, watch your creativity flourish!
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              onClick={() => {
                go({
                  to: "/prompts",
                  type: "push",
                });
              }}
            >
              Start now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                go({
                  to: "/about",
                  type: "push",
                });
              }}
            >
              Learn more
            </Button>
          </Stack>
        </Stack>
        <Stack sx={{ position: "relative", width: "100%" }}>
          <Box
            sx={{
              position: "absolute",
              width: "340px",
              height: "200px",
              bgcolor: "#363636",
              top: 0,
              border: "2px solid",
              borderRadius: "8px",
              borderColor: (theme) => {
                return prefersDarkMode
                  ? theme.palette.grey[800]
                  : theme.palette.grey[300];
              },
              overflow: "hidden",
            }}
          >
            <Image
              src={
                prefersDarkMode
                  ? "/images/screenshots/list-grid-dark.png"
                  : "/images/screenshots/list-grid-light.png"
              }
              alt=""
              width={340}
              height={200}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              width: "340px",
              height: "200px",
              bgcolor: "#262626",
              top: 50,
              right: 90,
              border: "2px solid",
              borderRadius: "8px",
              borderColor: (theme) => {
                return prefersDarkMode
                  ? theme.palette.grey[800]
                  : theme.palette.grey[300];
              },
              overflow: "hidden",
            }}
          >
            <Image
              src={
                prefersDarkMode
                  ? "/images/screenshots/view-dark.png"
                  : "/images/screenshots/view-light.png"
              }
              alt=""
              width={340}
              height={200}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              width: "340px",
              height: "200px",
              bgcolor: "#161616",
              top: 100,
              right: 0,
              border: "2px solid",
              borderRadius: "8px",
              borderColor: (theme) => theme.palette.primary.main,
              overflow: "hidden",
            }}
          >
            <Image
              src={
                prefersDarkMode
                  ? "/images/screenshots/list-dark.png"
                  : "/images/screenshots/list-light.png"
              }
              alt=""
              width={340}
              height={200}
            />
          </Box>
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
        <Stack textAlign="center">
          <Typography variant="h5">10+</Typography>
          <Typography variant="overline">Prompts Created</Typography>
        </Stack>
        <Stack textAlign="center">
          <Typography variant="h5">5+</Typography>
          <Typography variant="overline">Users Registered</Typography>
        </Stack>
        <Stack textAlign="center">
          <Typography variant="h5">0</Typography>
          <Typography variant="overline">GitHub Stars</Typography>
        </Stack>
        <Stack textAlign="center">
          <Typography variant="h5">0</Typography>
          <Typography variant="overline">GitHub Forks</Typography>
        </Stack>
      </Stack>
      <Stack spacing={2} maxWidth="800px" mx="auto" textAlign="center">
        <Typography fontWeight="500" fontSize="24px">
          Sneak Peek: Experience the Prompteer Journey
        </Typography>
        <Typography sx={{ opacity: "0.8" }}>
          Step into the world of Prompteer through captivating screenshots.
          Witness the seamless interface, vibrant community, and innovative AI
          prompts that await you. Get a glimpse of the immersive experience that
          awaits within Prompteer!
        </Typography>
      </Stack>

      <Stack my={8} direction="row" justifyContent="space-between" spacing={2}>
        <Box
          sx={{
            width: "380px",
            height: "220px",
            bgcolor: "#363636",
            border: "2px solid",
            borderRadius: "8px",
            borderColor: (theme) => {
              return prefersDarkMode
                ? theme.palette.grey[800]
                : theme.palette.grey[300];
            },
            overflow: "hidden",
          }}
        >
          <Image
            src={
              prefersDarkMode
                ? "/images/screenshots/view-dark.png"
                : "/images/screenshots/view-light.png"
            }
            alt=""
            width={370}
            height={220}
          />
        </Box>
        <Box
          sx={{
            width: "380px",
            height: "220px",
            bgcolor: "#363636",
            border: "2px solid",
            borderRadius: "8px",
            borderColor: (theme) => {
              return prefersDarkMode
                ? theme.palette.grey[800]
                : theme.palette.grey[300];
            },
            overflow: "hidden",
          }}
        >
          <Image
            src={
              prefersDarkMode
                ? "/images/screenshots/create-dark.png"
                : "/images/screenshots/create-light.png"
            }
            alt=""
            width={370}
            height={220}
          />
        </Box>
        <Box
          sx={{
            width: "380px",
            height: "220px",
            bgcolor: "#363636",
            border: "2px solid",
            borderRadius: "8px",
            borderColor: (theme) => {
              return prefersDarkMode
                ? theme.palette.grey[800]
                : theme.palette.grey[300];
            },
            overflow: "hidden",
          }}
        >
          <Image
            src={
              prefersDarkMode
                ? "/images/screenshots/list-dark.png"
                : "/images/screenshots/list-light.png"
            }
            alt=""
            width={370}
            height={220}
          />
        </Box>
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
