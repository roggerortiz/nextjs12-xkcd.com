import Head from "next/head";
import { useTheme } from "@nextui-org/react";
import { Box } from "./Box";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Content } from "./Content";

export function Layout({ children, title, description }) {
  const { isDark } = useTheme()

  return (
    <Box css={{
      maxW: "100%",
      backgroundColor: (!isDark ? "$gray200" : undefined)
    }}>
      <Head>
        <title>XKCD | {title}</title>
        <meta name="description" content={description} />
      </Head>

      <Header />

      <Content>
        {children}
      </Content>

      <Footer />
    </Box>
  )
}