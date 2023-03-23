import { useTheme as useNextTheme } from 'next-themes'
import { Button, Link, Navbar, Text, useTheme } from "@nextui-org/react"
import { DarkIcon } from 'svgs/DarkIcon'
import { LightIcon } from 'svgs/LightIcon'
import NavLink from "./NavLink"

export function Header() {
  const { isDark } = useTheme()
  const { setTheme } = useNextTheme()

  const handleToggleTheme = (e) => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      variant="sticky"
    >
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          XKCD App
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        hideIn="xs"
        variant="underline"
        activeColor="primary"
      >
        <Button
          auto
          light
          ripple={false}
          as={Navbar.Link}
          css={{ width: "auto", borderRadius: "0" }}
          icon={isDark ? <LightIcon /> : <DarkIcon />}
          onClick={handleToggleTheme}
        />

        <NavLink href="/">
          Home
        </NavLink>

        <NavLink href="/about">
          About
        </NavLink>
      </Navbar.Content>
    </Navbar>
  )
}