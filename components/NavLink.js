import { Navbar } from "@nextui-org/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavLink({ children, href }) {
  const router = useRouter()

  return (
    <Link href={href} passHref>
      <Navbar.Link isActive={router.pathname === href}>
        {children}
      </Navbar.Link>
    </Link>
  )
}