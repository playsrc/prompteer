import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { IResourceComponentsProps, useTranslate } from "@refinedev/core";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

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
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <Controller
          control={control}
          name="user_id"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...userAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                return (
                  userAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("prompts.fields.user_id")}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.user_id}
                  helperText={(errors as any)?.user_id?.message}
                  required
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
              {...languageAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                return (
                  languageAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("prompts.fields.language_id")}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.language_id}
                  helperText={(errors as any)?.language_id?.message}
                  required
                />
              )}
            />
          )}
        />
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
          label={translate("prompts.fields.title")}
          name="title"
        />
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
          label={translate("prompts.fields.content")}
          name="content"
        />
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
          label={translate("prompts.fields.parameter")}
          name="parameter"
        />
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
          label={translate("prompts.fields.detail")}
          name="detail"
        />
        <TextField
          {...register("like_count", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.like_count}
          helperText={(errors as any)?.like_count?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("prompts.fields.like_count")}
          name="like_count"
        />
        <TextField
          {...register("flag_count", {
            required: "This field is required",
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.flag_count}
          helperText={(errors as any)?.flag_count?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label={translate("prompts.fields.flag_count")}
          name="flag_count"
        />
        <Controller
          control={control}
          name="is_flagged"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <FormControlLabel
              label={translate("prompts.fields.is_flagged")}
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked);
                  }}
                />
              }
            />
          )}
        />
        {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
        <TextField
          {...register("created_at", {
            required: "This field is required",
          })}
          error={!!(errors as any)?.created_at}
          helperText={(errors as any)?.created_at?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label={translate("prompts.fields.created_at")}
          name="created_at"
        />
        <Controller
          control={control}
          name="ai_model_id"
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...aiModelAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value);
              }}
              getOptionLabel={(item) => {
                return (
                  aiModelAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.name ?? ""
                );
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={translate("prompts.fields.ai_model_id")}
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.ai_model_id}
                  helperText={(errors as any)?.ai_model_id?.message}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
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
