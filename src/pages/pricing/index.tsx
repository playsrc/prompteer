import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function PricingPage() {
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
    </>
  );
}

PricingPage.noLayout = true;
