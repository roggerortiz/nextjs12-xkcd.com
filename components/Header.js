import { Navbar, Text } from "@nextui-org/react"
import Link from "next/link"
import NavLink from "./NavLink"
import NavSearch from './NavSearch'
import NavTheme from './NavTheme'

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

        <NavSearch />
      </Navbar.Content>
    </Navbar>
  )
}