import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Typography variant="h2">About</Typography>
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

AboutPage.noLayout = true;
