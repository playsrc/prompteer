import { useList } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "../api/auth/[...nextauth]";
import { Prompt } from "@prisma/client";
import Link from "next/link";

export default function PromptsList() {
  const { data, isLoading, isError } = useList<Prompt>({
    resource: "prompts",
  });

  const prompts = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <ul>
      {prompts.map((prompt) => (
        <li key={prompt.id}>
          <p>
            <strong>{prompt.title}</strong>
          </p>
          <p>{prompt.content}</p>
          <Link href={`/prompts/show/${prompt.id}`}>Details</Link>
        </li>
      ))}
    </ul>
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
