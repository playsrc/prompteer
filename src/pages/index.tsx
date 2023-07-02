import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useGo } from "@refinedev/core";

export default function HomePage() {
  const go = useGo();
  return (
    <>
      <Typography variant="h2">Home</Typography>
      <Stack spacing={2} direction="row">
        <Button variant="text">
          <Link href="/pricing" style={{ textDecoration: "none" }}>
            Pricing
          </Link>
        </Button>
        <Button variant="text">
          <Link href="/about" style={{ textDecoration: "none" }}>
            About
          </Link>
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            go({
              to: "/dashboard",
              type: "push",
            });
          }}
        >
          Dashboard
        </Button>
      </Stack>
    </>
  );
}

HomePage.noLayout = true;
