import { Col, Container, Row } from "@nextui-org/react";
import Head from "next/head";
import { Box } from "./Box";
import { Header } from "./Header";

export default function Layout({ children }) {
  return (
    <Box css={{ maxW: "100%" }}>
      <Head>
        <title>XKCD App - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Box as="main" css={{ px: "$12", mt: "$8", "@xsMax": { px: "$10" } }}>
        <Container display="flex" justify="center" direction="row">
          {children}
        </Container>
      </Box>
    </Box>
  )
}