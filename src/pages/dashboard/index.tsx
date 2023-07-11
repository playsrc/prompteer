import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "../api/auth/[...nextauth]";
import { Article, Refresh } from "@mui/icons-material";

export default function Dashboard() {
  return (
    <>
      <Box
        sx={{
          p: { xs: 1, md: 2, lg: 3 },
          bgcolor: (theme) => theme.palette.background.paper,
          minHeight: "150px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize="24px" fontWeight="500">
              Dashboard
            </Typography>
            <IconButton>
              <Refresh />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              size="large"
              style={{
                minWidth: "128px",
                textTransform: "capitalize",
                border: "none",
                outline: "2px solid",
              }}
              variant="outlined"
            >
              Click
            </Button>
            <Button
              size="large"
              style={{
                minWidth: "128px",
                textTransform: "capitalize",
                boxShadow: "none",
              }}
              variant="contained"
            >
              Click
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          p: { xs: 1, md: 2, lg: 3 },
        }}
      >
        <Box
          sx={{
            p: "16px",
            border: "2px solid",
            borderColor: (theme) => theme.palette.action.selected,
            borderRadius: "8px",
            mt: "-80px",
            height: "500px",
            bgcolor: (theme) => theme.palette.background.paper,
            // boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.1)",
          }}
        ></Box>
      </Box>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  if (!session) {
    return {
      redirect: {
        destination: "/login?to=/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      ...translateProps,
    },
  };
};
