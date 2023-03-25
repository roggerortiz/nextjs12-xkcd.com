import Link from "next/link"
import { Navbar, Text } from "@nextui-org/react"
import { NavLink } from "./NavLink"
import { NavTheme } from './NavTheme'
import { NavSearch } from './NavSearch'
import { NavLanguage } from "./NavLanguage"

export function Header() {
  return (
    <Navbar
      isCompact
      isBordered
      variant="sticky"
    >
      <Navbar.Brand>
        <Link href="/">
          <a>
            <Text b color="inherit" hideIn="xs">
              XKCD
            </Text>
          </a>
        </Link>
      </Navbar.Brand>

      <Navbar.Content
        hideIn="xs"
        variant="underline"
        activeColor="primary"
      >
        <NavLink href="/">
          Home
        </NavLink>

        <NavTheme />

        <NavLanguage />

        <NavSearch />
      </Navbar.Content>
    </Navbar>
  )
}