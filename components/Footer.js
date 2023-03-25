import { Container, Link, useTheme } from "@nextui-org/react";

export function Footer() {
  const { isDark } = useTheme()

  return (
    <Container
      fluid
      as="footer"
      display="flex"
      justify="center"
      alignItems="center"
      css={{
        padding: "0",
        height: "60px",
        backgroundColor: (!isDark ? "$white" : undefined),
        borderTop: "1px solid $gray300"
      }}
    >
      All comics by &nbsp; <Link href="https://xkcd.com/">xkcd.com</Link>
    </Container>
  )
}