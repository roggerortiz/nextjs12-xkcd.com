import NextLink from "next/link"
import { Navbar, styled, Text } from "@nextui-org/react"
import { NavLink } from "./NavLink"
import { NavTheme } from './NavTheme'
import { NavSearch } from './NavSearch'
import { NavLanguage } from "./NavLanguage"

const LngDiv = styled('li', {
  "@xsMax": {
    display: 'none'
  },
})

export function Header() {
  return (
    <Navbar
      isCompact
      isBordered
      variant="sticky"
    >
      <Navbar.Brand
        css={{
          marginRight: '1rem'
        }}
      >
        <Navbar.Toggle
          className="sm:hidden"
          aria-label="toggle navigation"
        />
        <NextLink href="/" className="xs:hidden">
          <a>
            <Text b color="inherit" hideIn="xs">
              XKCD
            </Text>
          </a>
        </NextLink>
      </Navbar.Brand>

      <Navbar.Content
        variant="underline"
        activeColor="primary"
      >
        <NavLink href='/'>
          Home
        </NavLink>

        <li>
          <NavTheme />
        </li>

        <LngDiv>
          <NavLanguage />
        </LngDiv>

        <NavSearch />
      </Navbar.Content>

      <Navbar.Collapse showIn='xs'>
        <Navbar.CollapseItem>
          <NextLink href="/">
            Home
          </NextLink>
        </Navbar.CollapseItem>

        <Navbar.CollapseItem>
          <NavLanguage />
        </Navbar.CollapseItem>
      </Navbar.Collapse>
    </Navbar>
  )
}