import { useList, useOne } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "../api/auth/[...nextauth]";
import { AiModel, Language, Prompt, User } from "@prisma/client";
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

dayjs.extend(relativeTime);

export default function PromptsList() {
  const { data, isLoading, isError, refetch, isRefetching } = useList<Prompt>({
    resource: "prompts",
  });
  const { data: languageData, isLoading: languageIsLoading } =
    useList<Language>({
      resource: "languages",
    });
  const { data: aiModelData, isLoading: aiModelIsLoading } = useList<AiModel>({
    resource: "ai_models",
  });
  const { data: userData, isLoading: userIsLoading } = useList<User>({
    resource: "users",
  });

  const [displayGrid, setDisplayGrid] = useState(false);

  const prompts = data?.data ?? [];
  const languages = languageData?.data ?? [];
  const aiModels = aiModelData?.data ?? [];
  const users = userData?.data ?? [];

  // if (isLoading || isRefetching) {
  //   return <div>Loading...</div>;
  // }

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
            <FormControl>
              <Select size="small" defaultValue="recent">
                <MenuItem value="trending">Trending</MenuItem>
                <MenuItem value="recent">Recent</MenuItem>
                <MenuItem value="mostVoted">Most voted</MenuItem>
                <MenuItem value="mostCommented">Most commented</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
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
            </Button>
            <Button
              startIcon={<Add />}
              size="large"
              style={{
                minWidth: "128px",
                textTransform: "capitalize",
                boxShadow: "none",
              }}
              variant="contained"
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
            {prompts.map((prompt) => {
              const aiModel = aiModels.find(
                ({ id }) => id === prompt.ai_model_id
              );
              const language = languages.find(
                ({ id }) => id === prompt.language_id
              );
              const user = users.find(({ id }) => id === prompt.user_id);

              return (
                <Grid xs={displayGrid ? 6 : 0} item key={prompt.id}>
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
                        {dayjs(prompt.created_at).fromNow()}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Link
                    href={`/prompts/show/${prompt.id}`}
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
                      minHeight: "180px",
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
                        <Typography
                          textOverflow="ellipsis"
                          whiteSpace="nowrap"
                          maxWidth="500px"
                          overflow="hidden"
                          fontSize="20px"
                          mb={1}
                          fontWeight="600"
                        >
                          {prompt.title}
                        </Typography>
                        <Typography>
                          {prompt.content.slice(0, 150) + "..."}
                        </Typography>
                      </Box>
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          sx={{ opacity: "0.8" }}
                        >
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <FavoriteBorderOutlined fontSize="small" />
                            <Typography fontSize="small">
                              {prompt?.like_count ?? 0}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <ModeCommentOutlined fontSize="small" />
                            <Typography fontSize="small">
                              {prompt?.like_count ?? 0}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <TranslateOutlined fontSize="small" />
                            <Typography fontSize="small">
                              {language?.name}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Stack>
                    <Stack
                      sx={{
                        borderLeft: "1px solid",
                        borderColor: (theme) => theme.palette.action.selected,
                        p: "1rem",
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: "150px",
                      }}
                    >
                      <Typography>{aiModel?.name}</Typography>
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
