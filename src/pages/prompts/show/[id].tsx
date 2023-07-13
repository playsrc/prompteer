import {
  Refresh,
  WindowOutlined,
  TableRowsOutlined,
  TableRows,
  LockOutlined,
  Add,
  ThumbUpOutlined,
  CopyAllOutlined,
} from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  Tooltip,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Button,
  LinearProgress,
} from "@mui/material";
import { Prompt } from "@prisma/client";
import { useShow } from "@refinedev/core";
import { MuiShowInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

export default function PromptShow() {
  const { queryResult } = useShow<Prompt>();
  const { data, isLoading, isError, refetch } = queryResult;

  const prompt = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }
  return (
    <>
      <Box
        sx={{
          p: { xs: 1, md: 2, lg: 3 },
          // bgcolor: (theme) => theme.palette.background.paper,
          // minHeight: "150px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize="24px" fontWeight="500">
              Prompts
            </Typography>
            <Tooltip title="Refresh">
              <IconButton onClick={() => refetch()}>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              startIcon={<ThumbUpOutlined />}
              size="large"
              style={{
                minWidth: "128px",
                textTransform: "capitalize",
                border: "none",
                outline: "2px solid",
              }}
              variant="outlined"
            >
              Like
            </Button>
            <Button
              startIcon={<CopyAllOutlined />}
              size="large"
              style={{
                minWidth: "128px",
                textTransform: "capitalize",
                boxShadow: "none",
              }}
              variant="contained"
            >
              Copy
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          p: { xs: 1, md: 2, lg: 3 },
        }}
      >
        {isLoading ? (
          <>
            <LinearProgress />
          </>
        ) : (
          <div>
            <p>
              <strong>Prompt details </strong>
            </p>
            <p>id: {prompt?.id}</p>
            <p>title: {prompt?.title}</p>
            <p>content: {prompt?.content}</p>
          </div>
        )}
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
        destination: "/login?to=/prompts",
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
