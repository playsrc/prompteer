import { AuthBindings, Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider, notificationProvider } from "@refinedev/mui";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/nextjs-router";
import type { NextPage } from "next";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";

import { ThemedLayoutV2 } from "@components/themedLayout";
import { ColorModeContextProvider } from "@contexts";
import {
  Article,
  ForumOutlined,
  Inventory2Outlined,
  PersonOutline,
  SettingsOutlined,
  SpaceDashboardOutlined,
  WysiwygOutlined,
} from "@mui/icons-material";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { dataProvider } from "@refinedev/supabase";
import { appWithTranslation, useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { supabaseClient } from "src/utility";
import { ThemedTitleV2 } from "@components/themedLayout/title";

export type ExtendedNextPage = NextPage & {
  noLayout?: boolean;
};

type ExtendedAppProps = AppProps & {
  Component: ExtendedNextPage;
};

const App = (props: React.PropsWithChildren) => {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const { data, status } = useSession();
  const router = useRouter();
  const { to } = router.query;

  if (status === "loading") {
    return <span>loading...</span>;
  }

  const authProvider: AuthBindings = {
    login: async ({ providerName, email, password }) => {
      if (providerName) {
        signIn(providerName, {
          callbackUrl: to ? to.toString() : "/",
          redirect: true,
        });

        return {
          success: true,
        };
      }

      signIn("credentials", {
        email,
        password,
        callbackUrl: to ? to.toString() : "/",
        redirect: true,
      });

      return {
        success: true,
      };
    },
    logout: async () => {
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });

      return {
        success: true,
      };
    },
    onError: async (error) => {
      console.error(error);
      return {
        error,
      };
    },
    check: async () => {
      if (status === "unauthenticated") {
        return {
          authenticated: false,
          redirectTo: "/login",
        };
      }

      return {
        authenticated: true,
      };
    },
    getPermissions: async () => {
      return null;
    },
    getIdentity: async () => {
      if (data?.user) {
        const { user } = data;
        return {
          name: user.name,
          avatar: user.image,
        };
      }
      return null;
    },
  };

  return (
    <>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              routerProvider={routerProvider}
              dataProvider={dataProvider(supabaseClient)}
              authProvider={authProvider}
              notificationProvider={notificationProvider}
              i18nProvider={i18nProvider}
              resources={[
                {
                  name: "dashboard",
                  list: "/dashboard",
                  meta: {
                    label: "Dashboard",
                    icon: <SpaceDashboardOutlined />,
                  },
                },
                {
                  name: "prompts",
                  list: "/prompts",
                  create: "/prompts/create",
                  edit: "/prompts/edit/:id",
                  show: "/prompts/show/:id",
                  meta: { icon: <WysiwygOutlined /> },
                },
                {
                  name: "Created prompts",
                  list: "/",
                  meta: { icon: <Inventory2Outlined /> },
                },
                {
                  name: "Created comments",
                  list: "/",
                  meta: { icon: <ForumOutlined /> },
                },
                {
                  name: "My profile",
                  list: "/",
                  meta: { label: "My profile", icon: <PersonOutline /> },
                },
                {
                  name: "Settings",
                  list: "/",
                  meta: { icon: <SettingsOutlined /> },
                },
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              {props.children}
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler
                handler={({ resource, action, params }) => {
                  let title = "Prompteer"; // Default title

                  if (resource) {
                    title = `${
                      resource.name[0].toUpperCase() + resource.name.slice(1)
                    } • Prompteer
                    `;
                  }

                  return title;
                }}
              />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </>
  );
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: ExtendedAppProps): JSX.Element {
  const renderComponent = () => {
    if (Component.noLayout) {
      return <Component {...pageProps} />;
    }

    return (
      <ThemedLayoutV2
        Title={({ collapsed }) => (
          <ThemedTitleV2
            collapsed={collapsed}
            icon={<Article />}
            text="Prompteer"
          />
        )}
      >
        <Component {...pageProps} />
      </ThemedLayoutV2>
    );
  };

  return (
    <SessionProvider session={session}>
      <App>{renderComponent()}</App>
    </SessionProvider>
  );
}

export default appWithTranslation(MyApp);
