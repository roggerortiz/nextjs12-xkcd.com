import NextLink from "next/link";
import { useRouter } from "next/router";
import { Navbar, styled } from "@nextui-org/react";

export function NavLink({ children, href }) {
  const router = useRouter()
  const isCurrentPath = (router.pathname === href)

  return (
    <NextLink href={href} passHref>
      <Navbar.Link isActive={isCurrentPath}>
        {children}
      </Navbar.Link>
    </NextLink>
  )
}