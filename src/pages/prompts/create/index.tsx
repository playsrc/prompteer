import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

import { DeleteOutline, Refresh, SaveOutlined } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCreate, useGo, useNavigation, useTranslate } from "@refinedev/core";
import { useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { useSession } from "next-auth/react";
import { Controller } from "react-hook-form";

export default function PromptCreate() {
  const { data: session } = useSession();
  const { mutate } = useCreate();
  const { goBack } = useNavigation();
  const go = useGo();

  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmit(data: any) {
    mutate({
      resource: "prompts",
      values: {
        ...data,
        created_at: new Date().toISOString(),
        user_id: session?.user?.id,
      },
    });
    goBack();
  }

  const { autocompleteProps: languageAutocompleteProps } = useAutocomplete({
    resource: "languages",
  });

  const { autocompleteProps: aiModelAutocompleteProps } = useAutocomplete({
    resource: "ai_models",
  });

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
            <Typography
              fontSize="24px"
              fontWeight="600"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              maxWidth="500px"
              overflow="hidden"
            >
              New prompt
            </Typography>
            <Tooltip title="Refresh">
              <IconButton>
                <Refresh />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={2} alignItems="center">
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
              onClick={() => goBack()}
            >
              Cancel
            </Button>
            <Button
              startIcon={<SaveOutlined />}
              size="large"
              style={{
                minWidth: "128px",
                textTransform: "capitalize",
                boxShadow: "none",
              }}
              variant="contained"
              form="form"
              type="submit"
            >
              Save
            </Button>
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          px: { xs: 1, md: 2, lg: 3 },
        }}
      >
        {formLoading ? (
          <Box>
            <LinearProgress />
          </Box>
        ) : (
          <Stack
            spacing={3}
            sx={{
              p: "16px",
              border: "2px solid",
              borderColor: (theme) => theme.palette.action.selected,
              borderRadius: "8px",
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <Box
              id="form"
              component="form"
              sx={{ display: "flex", gap: "16px", flexDirection: "column" }}
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Stack spacing={1}>
                <Typography>Title</Typography>
                <TextField
                  {...register("title", {
                    required: "This field is required",
                  })}
                  error={!!(errors as any)?.title}
                  helperText={(errors as any)?.title?.message}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="title"
                />
              </Stack>

              <Stack spacing={1}>
                <Typography>Prompt</Typography>
                <TextField
                  {...register("content", {
                    required: "This field is required",
                  })}
                  error={!!(errors as any)?.content}
                  helperText={(errors as any)?.content?.message}
                  margin="normal"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  type="text"
                  name="content"
                  multiline
                  rows={3}
                />
              </Stack>

              {session?.user?.stripeActive && (
                <>
                  <Stack spacing={1}>
                    <Typography>Parameters</Typography>
                    <TextField
                      {...register("parameter", {
                        required: "This field is required",
                      })}
                      error={!!(errors as any)?.parameter}
                      helperText={(errors as any)?.parameter?.message}
                      margin="normal"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      name="parameter"
                      multiline
                      rows={3}
                    />
                  </Stack>

                  <Stack spacing={1}>
                    <Typography>Details</Typography>
                    <TextField
                      {...register("detail", {
                        required: "This field is required",
                      })}
                      error={!!(errors as any)?.detail}
                      helperText={(errors as any)?.detail?.message}
                      margin="normal"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      type="text"
                      name="detail"
                      multiline
                      rows={3}
                    />
                  </Stack>
                </>
              )}
              <Stack direction="row" spacing={2} width="100%">
                <Controller
                  control={control}
                  name="ai_model_id"
                  rules={{ required: "This field is required" }}
                  // eslint-disable-next-line
                  defaultValue={null as any}
                  render={({ field }) => (
                    <Autocomplete
                      fullWidth
                      {...aiModelAutocompleteProps}
                      {...field}
                      onChange={(_, value) => {
                        field.onChange(value?.id ?? value);
                      }}
                      getOptionLabel={(item) => {
                        return (
                          aiModelAutocompleteProps?.options?.find(
                            (p) =>
                              p?.id?.toString() ===
                              (item?.id ?? item)?.toString()
                          )?.name ?? ""
                        );
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value === undefined ||
                        option?.id?.toString() ===
                          (value?.id ?? value)?.toString()
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="AI Model"
                          margin="normal"
                          variant="outlined"
                          error={!!(errors as any)?.ai_model_id}
                          helperText={(errors as any)?.ai_model_id?.message}
                          required
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="language_id"
                  rules={{ required: "This field is required" }}
                  // eslint-disable-next-line
                  defaultValue={null as any}
                  render={({ field }) => (
                    <Autocomplete
                      fullWidth
                      {...languageAutocompleteProps}
                      {...field}
                      onChange={(_, value) => {
                        field.onChange(value?.id ?? value);
                      }}
                      getOptionLabel={(item) => {
                        return (
                          languageAutocompleteProps?.options?.find(
                            (p) =>
                              p?.id?.toString() ===
                              (item?.id ?? item)?.toString()
                          )?.name ?? ""
                        );
                      }}
                      isOptionEqualToValue={(option, value) =>
                        value === undefined ||
                        option?.id?.toString() ===
                          (value?.id ?? value)?.toString()
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Language"
                          margin="normal"
                          variant="outlined"
                          error={!!(errors as any)?.language_id}
                          helperText={(errors as any)?.language_id?.message}
                          required
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              </Stack>
              {!session?.user?.stripeActive && (
                <Stack
                  marginX="auto"
                  maxWidth="900px"
                  borderRadius="8px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  px={8}
                  py={4}
                  spacing={2}
                >
                  <Stack
                    spacing={4}
                    alignItems="center"
                    width="100%"
                    textAlign="center"
                  >
                    <Typography fontWeight="500" fontSize="24px">
                      Are you ready to unleash the full potential of Prompteer?
                      <br />
                      Check out our PRO subscription.
                    </Typography>
                    <Button
                      size="large"
                      variant="contained"
                      sx={{ marginX: "auto", width: "max-content" }}
                      onClick={() => {
                        go({
                          to: "/pricing",
                          type: "replace",
                        });
                      }}
                    >
                      Start now
                    </Button>
                  </Stack>
                </Stack>
              )}
            </Box>
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
