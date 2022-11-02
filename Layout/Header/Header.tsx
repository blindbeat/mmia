import styles from "./Header.module.css"
import Logo from "./assets/logo.svg"
import Burger from "./assets/burger.svg"
import Link from "next/link"
import CtaLink from "Layout/Header/CtaLink"

const navLinks: [name: string, url: string][] = [
  ["projects", "projects"],
  ["about us", "about"],
  ["contact", "contact"],
]

function Header() {
  return (
    <header className={styles.content}>
      <Burger className={styles.burger} />
      <Logo className={styles.logo} />
      <nav>
        {navLinks.map(([name, url]) => (
          <Link key={url} href={url}>
            {name}
          </Link>
        ))}
      </nav>
      <CtaLink href="#" />
    </header>
  )
}

export default Header
