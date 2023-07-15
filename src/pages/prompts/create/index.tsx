import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  LinearProgress,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
import {
  FavoriteBorderOutlined,
  CopyAllOutlined,
  CancelOutlined,
  CreateOutlined,
  SaveOutlined,
  Refresh,
  DeleteOutline,
  Build,
  LibraryBooks,
} from "@mui/icons-material";

export default function PromptCreate() {
  const translate = useTranslate();
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm();

  const { autocompleteProps: userAutocompleteProps } = useAutocomplete({
    resource: "users",
  });

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
              // boxShadow: "0px 0px 16px 0px rgba(0,0,0,0.1)",
            }}
          >
            <Box
              component="form"
              sx={{ display: "flex", gap: "16px", flexDirection: "column" }}
              autoComplete="off"
            >
              <Stack spacing={1}>
                <Typography fontSize="20px" fontWeight="500">
                  Title
                </Typography>
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
                <Typography fontSize="20px" fontWeight="500">
                  Prompt
                </Typography>
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

              <Stack spacing={1}>
                <Typography fontSize="20px" fontWeight="500">
                  Parameters
                </Typography>
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
                <Typography fontSize="20px" fontWeight="500">
                  Details
                </Typography>
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
