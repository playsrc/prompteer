import { Article } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import { useGo } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { stripe } from "src/utility";
import { authOptions } from "../api/auth/[...nextauth]";

interface PricingProps {
  plusPrice: string;
  proPrice: string;
}

export default function PricingPage({ plusPrice, proPrice }: PricingProps) {
  const go = useGo();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
      }}
    >
      <Stack my={3} direction="row" justifyContent="space-between">
        <Link href="/" style={{ color: "unset", textDecoration: "none" }}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Article color="primary" fontSize="large" />
            <Typography fontSize="24px" fontWeight="500">
              Prompteer
            </Typography>
          </Stack>
        </Link>
        <Stack direction="row" spacing={1} justifyContent="space-between">
          <Link href="/pricing" style={{ textDecoration: "none" }}>
            <Button variant="text">Pricing</Button>
          </Link>
          <Link href="/about" style={{ textDecoration: "none" }}>
            <Button variant="text">About</Button>
          </Link>
          <Link
            href="https://github.com/mateusabelli/prompteer"
            style={{ textDecoration: "none" }}
          >
            <Button variant="text">GitHub</Button>
          </Link>

          <Divider />
          <Button
            variant="contained"
            onClick={() => {
              go({
                to: "/prompts",
                type: "push",
              });
            }}
          >
            Prompts
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={4} my={8} alignItems="center">
        <Stack spacing={4}>
          <Typography variant="h3" fontWeight="600">
            We have a plan for you!
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Stack
            minWidth="300px"
            minHeight="470px"
            p={4}
            spacing={4}
            sx={{
              border: "1px solid",
              borderColor: (theme) => theme.palette.action.selected,
              bgcolor: (theme) => theme.palette.background.paper,
              borderRadius: "8px",
              width: "max-content",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Free</Typography>
            <Typography variant="h3">$0.00</Typography>
            <Button
              size="large"
              sx={{
                alignSelf: "center",
                borderRadius: "100px",
                maxWidth: "max-content",
              }}
              variant="contained"
              id="checkout-and-portal-button"
              onClick={() => {
                go({
                  to: "/prompts",
                  type: "push",
                });
              }}
            >
              Start now
            </Button>
            <Stack textAlign="start">
              <Typography>Features included</Typography>
              <ul>
                <li>Publish Prompts</li>
                <li>Write Comments</li>
              </ul>
            </Stack>
          </Stack>
          {/* <Stack
            minWidth="300px"
            minHeight="470px"
            p={4}
            spacing={4}
            sx={{
              border: "1px solid",
              borderColor: (theme) => theme.palette.action.selected,
              bgcolor: (theme) => theme.palette.background.paper,
              borderRadius: "8px",
              width: "max-content",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Plus</Typography>
            <Typography variant="h3">{plusPrice}</Typography>
            <form action="/api/stripe/create-checkout-session" method="POST">
              {/* Add a hidden field with the lookup_key of your Price */}
          {/* <input
                type="hidden"
                name="lookup_key"
                value={process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID}
              />
              <Button
                size="large"
                sx={{
                  alignSelf: "center",
                  borderRadius: "100px",
                  maxWidth: "max-content",
                }}
                variant="contained"
                id="checkout-and-portal-button"
                type="submit"
              >
                Checkout
              </Button>
            </form>
            <Stack textAlign="start">
              <Typography>Features included</Typography>
              <ul>
                <li>Publish Prompts</li>
                <li>Write Comments</li>
                <li>Favorite Prompts</li>
                <li>Write Prompt Parameters</li>
              </ul>
            </Stack>
          </Stack> */}
          <Stack
            minWidth="300px"
            minHeight="470px"
            p={4}
            spacing={4}
            sx={{
              border: "1px solid",
              borderColor: (theme) => theme.palette.action.selected,
              bgcolor: (theme) => theme.palette.background.paper,
              borderRadius: "8px",
              width: "max-content",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">Pro</Typography>
            <Typography variant="h3">{proPrice}</Typography>

            <form action="/api/stripe/create-checkout-session" method="POST">
              {/* Add a hidden field with the lookup_key of your Price */}
              <input
                type="hidden"
                name="lookup_key"
                value={process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID}
              />
              <Button
                size="large"
                sx={{
                  alignSelf: "center",
                  borderRadius: "100px",
                  maxWidth: "max-content",
                }}
                variant="contained"
                id="checkout-and-portal-button"
                type="submit"
              >
                Checkout
              </Button>
            </form>

            <Stack textAlign="start">
              <Typography>Features included</Typography>
              <ul>
                <li>Publish Prompts</li>
                <li>Write Comments</li>
                <li>Write Prompt Parameters</li>
                <li>Write Prompt Details</li>
              </ul>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Stack>
        <Divider variant="fullWidth" />
        <Stack
          my={3}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Article color="primary" />
            <Typography fontSize="18px" fontWeight="500">
              Prompteer
            </Typography>
          </Stack>
          <Typography sx={{ opacity: "0.8" }}>
            &#169; 2023 All rights reserved.
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}

PricingPage.noLayout = true;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const translateProps = await serverSideTranslations(context.locale ?? "en", [
    "common",
  ]);

  const plusPriceRaw = await stripe.prices.retrieve(
    process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID as string
  );

  const proPriceRaw = await stripe.prices.retrieve(
    process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID as string
  );

  const plusPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(plusPriceRaw.unit_amount! / 100);

  const proPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(proPriceRaw.unit_amount! / 100);

  return {
    props: {
      plusPrice,
      proPrice,
      ...translateProps,
    },
  };
};
