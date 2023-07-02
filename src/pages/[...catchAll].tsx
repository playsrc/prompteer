import { ErrorComponent } from "@refinedev/mui";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { authOptions } from "./api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default function CatchAll() {
  return <ErrorComponent />;
}

CatchAll.noLayout = true;

export async function getServerSideProps(context: any) {
  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);
  // const session = await getServerSession(
  //     context.req,
  //     context.res,
  //     authOptions,
  // );

  // if (!session) {
  //     return {
  //         redirect: {
  //             destination: `/login?to=${encodeURIComponent(
  //                 context.req.url || "/",
  //             )}`,
  //             permanent: false,
  //         },
  //     };
  // }

  // return {
  //     props: {
  //         session,
  //     },
  // };

  return {
    props: {
      ...translateProps,
    },
  };
}
