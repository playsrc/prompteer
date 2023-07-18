import {
  Add,
  Refresh,
  SettingsOutlined,
  TableRows,
  TableRowsOutlined,
  TranslateOutlined,
  Window,
  WindowOutlined,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Language } from "@prisma/client";
import { useGo, useList } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import tz from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { formatDistanceToNow } from "date-fns";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(tz);

export default function PromptsList() {
  const go = useGo();

  const { data, isLoading, isError, refetch, isRefetching } = useList({
    resource: "prompts",
    sorters: [{ field: "created_at", order: "desc" }],
  });
  const { data: languageData, isLoading: languageIsLoading } =
    useList<Language>({
      resource: "languages",
    });
  const { data: aiModelData, isLoading: aiModelIsLoading } = useList({
    resource: "ai_models",
  });
  const { data: userData, isLoading: userIsLoading } = useList({
    resource: "users",
  });

  const [displayGrid, setDisplayGrid] = useState(false);

  const prompts = data?.data ?? [];
  const languages = languageData?.data ?? [];
  const aiModels = aiModelData?.data ?? [];
  const users = userData?.data ?? [];

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <>
      <Box
        sx={{
          p: { xs: 1, md: 2, lg: 3 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography fontSize="24px" fontWeight="600">
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
                        {formatDistanceToNow(
                          dayjs(prompt?.created_at).utc(true).toDate(),
                          { addSuffix: true }
                        )}
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
                          fontWeight="500"
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
                            <SettingsOutlined fontSize="small" />
                            <Typography fontSize="small">
                              {aiModel?.name}
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
