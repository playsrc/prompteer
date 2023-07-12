import { useList, useOne } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "../api/auth/[...nextauth]";
import { AiModel, Language, Prompt } from "@prisma/client";
import Link from "next/link";
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
} from "@mui/material";
import { useState } from "react";

export default function PromptsList() {
  const { data, isLoading, isError } = useList<Prompt>({
    resource: "prompts",
  });
  const { data: languageData, isLoading: languageIsLoading } =
    useList<Language>({
      resource: "languages",
    });
  const { data: aiModelData, isLoading: aiModelIsLoading } = useList<AiModel>({
    resource: "ai_models",
  });

  const [displayGrid, setDisplayGrid] = useState(false);

  const prompts = data?.data ?? [];
  const languages = languageData?.data ?? [];
  const aiModels = aiModelData?.data ?? [];

  console.log("LANG", languages);
  console.log("AI", aiModels);

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
              <IconButton>
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
              <Select size="small" defaultValue="trending">
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

            return (
              <Grid xs={displayGrid ? 6 : 0} item key={prompt.id}>
                <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                  <Avatar sx={{ width: 32, height: 32 }} />
                  <Stack direction="row" spacing={1} sx={{ opacity: "0.8" }}>
                    <Typography fontSize="14px">
                      published a new prompt
                    </Typography>
                    <Typography fontSize="14px">•</Typography>
                    <Typography fontSize="14px">{prompt.created_at}</Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{
                    p: "16px",
                    border: "2px solid",
                    borderColor: (theme) => theme.palette.action.selected,
                    borderRadius: "8px",
                    bgcolor: (theme) => theme.palette.background.paper,
                    // boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.1)",
                    minHeight: "180px",
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
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <FavoriteBorderOutlined fontSize="small" />
                          <Typography fontSize="small">
                            {prompt.likeCount ?? 0}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <ForumOutlined fontSize="small" />
                          <Typography fontSize="small">
                            {prompt.likeCount ?? 0}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <TranslateOutlined fontSize="small" />
                          <Typography fontSize="small">English</Typography>
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
                    }}
                  >
                    <Typography>{aiModel?.name}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            );
          })}
        </Grid>
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
