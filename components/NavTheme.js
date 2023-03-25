
import { useTheme as useNextTheme } from 'next-themes'
import { Button, Navbar, useTheme } from "@nextui-org/react";
import { DarkIcon } from "svgs/DarkIcon";
import { LightIcon } from "svgs/LightIcon";

export default function NavTheme() {
  const { isDark } = useTheme()
  const { setTheme } = useNextTheme()

  const handleToggleTheme = (e) => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <Button
      auto
      light
      ripple={false}
      as={Navbar.Link}
      css={{ width: "auto", borderRadius: "0" }}
      icon={isDark ? <LightIcon /> : <DarkIcon />}
      onClick={handleToggleTheme}
    />
  )
}