import { useGo, useList, useOne } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "../api/auth/[...nextauth]";
import { AiModel, Comment, Language, Prompt, User } from "@prisma/client";
import {
  Add,
  ChatBubbleOutlineOutlined,
  ChatOutlined,
  Code,
  ContentCopyOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ForumOutlined,
  LockOutlined,
  ModeCommentOutlined,
  Refresh,
  SettingsOutlined,
  SplitscreenOutlined,
  TableRows,
  TableRowsOutlined,
  TranslateOutlined,
  ViewStream,
  Window,
  Window as WindowIcon,
  WindowOutlined,
} from "@mui/icons-material";
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Tooltip,
  Divider,
  Chip,
  FormControl,
  Select,
  MenuItem,
  Avatar,
  Grid,
  Link,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import tz from "dayjs/plugin/timezone";

import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(tz);

export default function PromptsList() {
  const go = useGo();
  const { data: session } = useSession();

  const { data, isLoading, isError, refetch, isRefetching } = useList<Comment>({
    resource: "comments",
    filters: [{ field: "user_id", value: session!.user!.id, operator: "eq" }],
    sorters: [{ field: "created_at", order: "desc" }],
  });

  const { data: promptData } = useList<Prompt>({
    resource: "prompts",
  });

  const { data: userData, isLoading: userIsLoading } = useList<User>({
    resource: "users",
  });

  const [displayGrid, setDisplayGrid] = useState(false);

  const prompts = promptData?.data ?? [];
  const comments = data?.data ?? [];
  const users = userData?.data ?? [];

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
            <Typography fontSize="24px" fontWeight="600">
              My Comments
            </Typography>
            <Tooltip title="Refresh">
              <IconButton onClick={() => refetch()}>
                <Refresh />
              </IconButton>
            </Tooltip>
            <Stack
              direction="row"
              spacing={0}
              paddingX="4px"
              alignItems="center"
              border="1px solid"
              borderColor={(theme) => theme.palette.action.focus}
              borderRadius="4px"
            >
              <Tooltip title="Grid mode">
                <IconButton onClick={() => setDisplayGrid(true)}>
                  {displayGrid ? <Window /> : <WindowOutlined />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Stack mode">
                <IconButton onClick={() => setDisplayGrid(false)}>
                  {displayGrid ? <TableRowsOutlined /> : <TableRows />}
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            {/* <Button
              startIcon={<LockOutlined />}
              size="large"
              style={{
                minWidth: "128px",
                textTransform: "capitalize",
                border: "none",
                outline: "2px solid",
              }}
              variant="outlined"
            >
              Prompt
            </Button> */}
            <Button
              startIcon={<Add />}
              size="large"
              style={{
                minWidth: "128px",
                textTransform: "capitalize",
                boxShadow: "none",
              }}
              variant="contained"
              onClick={() => {
                go({
                  to: "/prompts/create",
                  type: "push",
                });
              }}
            >
              Prompt
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          p: { xs: 1, md: 2, lg: 3 },
        }}
      >
        {isLoading || isRefetching ? (
          <>
            <LinearProgress />
          </>
        ) : (
          <Grid
            container
            direction={displayGrid ? "row" : "column"}
            alignContent={displayGrid ? "center" : "unset"}
            alignItems={displayGrid ? "center" : "unset"}
            wrap="wrap"
            spacing={4}
          >
            {comments.map((comment) => {
              const user = users.find(({ id }) => id === comment.user_id);
              const prompt = prompts.find(({ id }) => id === comment.prompt_id);

              return (
                <Grid xs={displayGrid ? 6 : 0} item key={comment.id}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Avatar
                      src={user?.image?.toString()}
                      alt={user?.name?.toString()}
                      sx={{ width: 32, height: 32 }}
                    />
                    <Stack direction="row" spacing={1} sx={{ opacity: "0.9" }}>
                      <Typography fontSize="14px">{user?.name}</Typography>
                      <Typography fontSize="14px">•</Typography>
                      <Typography fontSize="14px">
                        {formatDistanceToNow(
                          dayjs(comment?.created_at).utc(true).toDate(),
                          { addSuffix: true }
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Link
                    href={`/prompts/show/${prompt?.id}`}
                    sx={{
                      color: "unset",
                      textDecoration: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "8px",
                      p: "16px",
                      border: "2px solid",
                      borderColor: (theme) => theme.palette.action.selected,
                      borderRadius: "8px",
                      backgroundColor: (theme) =>
                        theme.palette.background.paper,
                      // boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.1)",
                      minHeight: "100px",
                      transition: "border-color 0.15s ease",
                      outline: "none",
                      ":hover": {
                        borderColor: (theme) => theme.palette.primary.main,
                        cursor: "pointer",
                      },
                      ":focus": {
                        borderColor: (theme) => theme.palette.primary.main,
                      },
                    }}
                  >
                    <Stack
                      width="100%"
                      direction="column"
                      justifyContent="space-between"
                    >
                      <Box>
                        <Typography>
                          {comment.content.length > 150
                            ? comment.content.slice(0, 150) + "..."
                            : comment.content}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
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