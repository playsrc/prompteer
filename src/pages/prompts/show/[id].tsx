import {
  Article,
  Build,
  CopyAllOutlined,
  DeleteOutline,
  LibraryBooks,
  ModeCommentOutlined,
  Refresh,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useCreate,
  useDelete,
  useList,
  useNavigation,
  useOne,
  useShow,
} from "@refinedev/core";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRef } from "react";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

import { formatDistanceToNow } from "date-fns";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.guess();

export default function PromptShow() {
  const { data: session } = useSession();

  const commentRef = useRef<HTMLTextAreaElement>();

  const { queryResult } = useShow();
  const { data, isLoading, isError, refetch } = queryResult;

  const prompt = data?.data;

  const { data: languageData, isLoading: languageIsLoading } = useOne({
    resource: "languages",
    id: prompt?.language_id,
  });
  const language = languageData?.data;

  const { data: userData, isLoading: userIsLoading } = useOne({
    resource: "users",
    id: prompt?.user_id,
  });
  const user = userData?.data;

  const { data: usersData, isLoading: usersIsLoading } = useList({
    resource: "users",
  });
  const users = usersData?.data;

  const { data: aiModelData, isLoading: aiModelIsLoading } = useOne({
    resource: "ai_models",
    id: prompt?.ai_model_id,
  });
  const aiModel = aiModelData?.data;

  const { data: commentData, isLoading: commentIsLoading } = useList({
    resource: "comments",
    sorters: [{ field: "created_at", order: "desc" }],
  });

  const { goBack } = useNavigation();
  const { mutate: deleteMutation } = useDelete();
  const { mutate: createMutation } = useCreate();

  function handleDeletePrompt(id: any) {
    deleteMutation({
      resource: "prompts",
      id: id,
    });
    goBack();
  }

  function handleDeleteComment(id: any) {
    deleteMutation({
      resource: "comments",
      id: id,
    });
  }

  const handleCreateComment = () => {
    if (
      commentRef!.current!.value === "" ||
      commentRef!.current!.value!.length === 0
    ) {
      return;
    }

    createMutation({
      resource: "comments",
      values: {
        prompt_id: prompt?.id,
        user_id: session?.user?.id,
        content: commentRef?.current?.value,
      },
    });

    commentRef!.current!.value = "";
  };

  const comments = commentData?.data ?? [];

  if (isLoading || aiModelIsLoading || languageIsLoading) {
    return <LinearProgress />;
  }

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
              {prompt?.title}
            </Typography>
            <Tooltip title="Refresh">
              <IconButton>
                <Refresh />
              </IconButton>
            </Tooltip>
            <Tooltip title="AI model used">
              <Chip variant="outlined" label={aiModel?.name} />
            </Tooltip>
            <Tooltip title="Written language">
              <Chip variant="outlined" label={language?.name} />
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
            {prompt?.user_id === session?.user?.id ? (
              <>
                <Button
                  startIcon={<DeleteOutline />}
                  size="large"
                  style={{
                    minWidth: "128px",
                    textTransform: "capitalize",
                    border: "none",
                    outline: "2px solid",
                  }}
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeletePrompt(prompt?.id || "")}
                >
                  Delete
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
                  onClick={() => {
                    navigator.clipboard.writeText(prompt?.content || "");
                    alert("Prompt content copied!");
                  }}
                >
                  Copy
                </Button>
              </>
            ) : (
              <>
                <Button
                  startIcon={<CopyAllOutlined />}
                  size="large"
                  style={{
                    minWidth: "128px",
                    textTransform: "capitalize",
                    boxShadow: "none",
                  }}
                  variant="contained"
                  onClick={() => {
                    navigator.clipboard.writeText(prompt?.content || "");
                    alert("Prompt content copied!");
                  }}
                >
                  Copy
                </Button>
              </>
            )}
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
              <Stack
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack spacing={1} direction="row" alignItems="center">
                  <Article fontSize="small" />
                  <Typography fontSize="20px" fontWeight="500">
                    Prompt
                  </Typography>
                </Stack>
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
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography fontSize="14px">{user?.name}</Typography>
              <Typography fontSize="14px">•</Typography>
              <Typography fontSize="14px">
                {formatDistanceToNow(
                  dayjs(prompt?.created_at).utc(true).toDate(),
                  { addSuffix: true }
                )}
              </Typography>
            </Stack>
            <Divider />

            <Stack alignItems="center" direction="row" spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <ModeCommentOutlined fontSize="small" />
                <Typography fontSize="20px" fontWeight="500">
                  Comments
                </Typography>
              </Stack>
            </Stack>

            <Stack
              border="2px solid"
              borderColor={(theme) => theme.palette.action.selected}
              borderRadius="8px"
            >
              <Stack
                p={1.5}
                overflow="hidden"
                direction="row"
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar src={session?.user?.image?.toString()} />
                  <Typography fontSize="18px" fontWeight="500">
                    {session?.user?.name}
                  </Typography>
                </Stack>
                <Button onClick={() => handleCreateComment()} variant="text">
                  Comment
                </Button>
              </Stack>
              <TextField
                multiline
                rows={3}
                sx={{ bgcolor: (theme) => theme.palette.background.default }}
                inputRef={commentRef}
              />
            </Stack>
            {comments
              .filter((c) => c.prompt_id === prompt?.id)
              .map((comment) => {
                const commentUser = users?.find(
                  (u) => u.id === comment.user_id
                );
                return (
                  <Stack
                    key={comment?.id}
                    border="1px solid"
                    borderColor={(theme) => theme.palette.action.selected}
                    borderRadius="8px"
                    p={2}
                    spacing={2}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar src={commentUser?.image?.toString()} />
                        <Typography>{commentUser?.name}</Typography>
                        <Typography>•</Typography>
                        <Typography fontSize="14px">
                          {formatDistanceToNow(
                            dayjs(comment.created_at).utc(true).toDate(),
                            { addSuffix: true }
                          )}
                        </Typography>
                      </Stack>
                      {comment.user_id === session?.user?.id && (
                        <Tooltip title="Delete comment">
                          <IconButton
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <DeleteOutline color="error" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Stack>
                    <Typography>{comment?.content}</Typography>
                  </Stack>
                );
              })}
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
