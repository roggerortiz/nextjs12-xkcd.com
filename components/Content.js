import { Container } from "@nextui-org/react";

export function Content({ children }) {
  return (
    <Container
      as="main"
      css={{
        px: "$12",
        mt: "$8",
        mb: "$8",
        minHeight: "calc(100vh - 145px)",
        "@xsMax": { px: "$10" }
      }}
    >
      {children}
    </Container>
  )
}