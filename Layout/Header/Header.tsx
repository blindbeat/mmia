import styles from "./Header.module.css"
import Logo from "./assets/logo.svg"
import Burger from "./assets/burger.svg"
import Link from "next/link"
import CtaLink from "Layout/Header/CtaLink"
import { useEffect, useState } from "react"
import classNames from "classnames"

const navLinks: [name: string, url: string][] = [
  ["projects", "projects"],
  ["about us", "about"],
  ["contact", "contact"],
]

function Header() {
  const [transparent, setTransparent] = useState(true)
  const transparencyController = () => {
    setTransparent((state) => {
      return window.scrollY === 0 && !state
    })
  }

  console.log("rerender")

  useEffect(() => {
    window.addEventListener("scroll", transparencyController)
  }, [])

  return (
    <header
      className={classNames(styles.content, transparent && styles.transparent)}
    >
      <Burger className={styles.burger} />
      <Logo className={styles.logo} />
      <nav>
        {navLinks.map(([name, url]) => (
          <Link key={url} href={url}>
            {name}
          </Link>
        ))}
      </nav>
      <CtaLink href="#" className={styles.cta} />
    </header>
  )
}

export default Header
