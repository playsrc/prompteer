import { Box, Button, Stack, Typography } from "@mui/material";
import { useGo } from "@refinedev/core";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { stripe } from "src/utility";

interface PricingProps {
  plusPrice: string;
  proPrice: string;
}

export default function PricingPage({ plusPrice, proPrice }: PricingProps) {
  const go = useGo();
  return (
    <>
      <Typography variant="h2">Pricing</Typography>
      <Typography variant="body1">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
        maxime deleniti minus obcaecati rem officia eligendi ab quam dignissimos
        aliquam, assumenda ea ipsum aut! Officiis illo hic alias maiores
        distinctio!
      </Typography>
      <Button variant="text">
        <Link href="/" style={{ textDecoration: "none" }}>
          Home
        </Link>
      </Button>
      <Stack direction="row">
        <Box
          sx={{
            marginInline: "1rem",
            border: "1px solid",
            borderRadius: "8px",
            width: "max-content",
            p: "1rem",
            textAlign: "center",
          }}
        >
          <Typography variant="overline">Free</Typography>
          <Typography variant="h4">0.00</Typography>
          <Button
            variant="contained"
            id="checkout-and-portal-button"
            onClick={() => {
              go({
                to: "/dashboard",
                type: "push",
              });
            }}
          >
            Checkout
          </Button>
        </Box>

        <Box
          sx={{
            marginInline: "1rem",
            border: "1px solid",
            borderRadius: "8px",
            width: "max-content",
            p: "1rem",
            textAlign: "center",
          }}
        >
          <Typography variant="overline">Plus</Typography>
          <Typography variant="h4">{plusPrice}</Typography>
          <form action="/api/stripe/create-checkout-session" method="POST">
            {/* Add a hidden field with the lookup_key of your Price */}
            <input
              type="hidden"
              name="lookup_key"
              value={process.env.NEXT_PUBLIC_STRIPE_PLUS_PRICE_ID}
            />
            <Button variant="contained" type="submit">
              Checkout
            </Button>
          </form>
        </Box>

        <Box
          sx={{
            marginInline: "1rem",
            border: "1px solid",
            borderRadius: "8px",
            width: "max-content",
            p: "1rem",
            textAlign: "center",
          }}
        >
          <Typography variant="overline">Pro</Typography>
          <Typography variant="h4">{proPrice}</Typography>
          <form action="/api/stripe/create-checkout-session" method="POST">
            {/* Add a hidden field with the lookup_key of your Price */}
            <input
              type="hidden"
              name="lookup_key"
              value={process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID}
            />
            <Button variant="contained" type="submit">
              Checkout
            </Button>
          </form>
        </Box>
      </Stack>
    </>
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
