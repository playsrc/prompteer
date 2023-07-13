import {
  Refresh,
  WindowOutlined,
  TableRowsOutlined,
  TableRows,
  LockOutlined,
  Add,
  ThumbUpOutlined,
  CopyAllOutlined,
  Article,
  Build,
  LibraryBooks,
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
  Paper,
  Divider,
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
            <Typography
              fontSize="24px"
              fontWeight="600"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              maxWidth="500px"
              overflow="hidden"
            >
              {prompt?.title}
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
          px: { xs: 1, md: 2, lg: 3 },
        }}
      >
        {isLoading ? (
          <>
            <LinearProgress />
          </>
        ) : (
          <Stack
            spacing={3}
            sx={{
              p: "16px",
              border: "2px solid",
              borderColor: (theme) => theme.palette.action.selected,
              borderRadius: "8px",
              backgroundColor: (theme) => theme.palette.background.paper,
              // boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.1)",
            }}
          >
            <Stack spacing={1}>
              <Stack spacing={1} direction="row" alignItems="center">
                <Article fontSize="small" />
                <Typography fontSize="20px" fontWeight="500">
                  Prompt
                </Typography>
              </Stack>
              <Typography variant="body1">{prompt?.content}</Typography>
            </Stack>

            {prompt?.parameter && (
              <Stack spacing={1}>
                <Stack spacing={1} direction="row" alignItems="center">
                  <Build fontSize="small" />
                  <Typography fontSize="20px" fontWeight="500">
                    Parameters
                  </Typography>
                </Stack>
                <Typography variant="body1">{prompt?.parameter}</Typography>
              </Stack>
            )}
            {prompt?.detail && (
              <Stack spacing={1}>
                <Stack spacing={1} direction="row" alignItems="center">
                  <LibraryBooks fontSize="small" />
                  <Typography fontSize="20px" fontWeight="500">
                    Details
                  </Typography>
                </Stack>
                <Typography variant="body1">{prompt?.detail}</Typography>
              </Stack>
            )}
          </Stack>
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
