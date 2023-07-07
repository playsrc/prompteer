import { Prompt } from "@prisma/client";
import { useShow } from "@refinedev/core";
import { MuiShowInferencer } from "@refinedev/inferencer/mui";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "src/pages/api/auth/[...nextauth]";

export default function PromptShow() {
  const { queryResult } = useShow<Prompt>();
  const { data, isLoading, isError } = queryResult;

  const prompt = data?.data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }
  return (
    <div>
      <p>
        <strong>Prompt details </strong>
      </p>
      <p>id: {prompt?.id}</p>
      <p>title: {prompt?.title}</p>
      <p>content: {prompt?.content}</p>
    </div>
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
