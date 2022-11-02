import styles from "./Header.module.css"
import Logo from "./assets/logo.svg"
import Burger from "./assets/burger.svg"
import Link from "next/link"
import CtaLink from "Layout/Header/CtaLink"
import { useEffect, useRef, useState } from "react"
import classNames from "classnames"

const navLinks: [name: string, url: string][] = [
  ["projects", "projects"],
  ["about us", "about"],
  ["contact", "contact"],
]

const defineTransparency = (scrollY: number) => scrollY === 0

function Header() {
  const [transparent, setTransparent] = useState(
    typeof window !== "undefined" ? defineTransparency(window.scrollY) : true
  )
  const [hidden, setHidden] = useState(false)
  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )

  const transparencyController = () => {
    setTransparent(defineTransparency(window.scrollY))
  }

  const hideController = () => {
    if (window.scrollY === lastScrollRef.current) return
    setHidden(window.scrollY > lastScrollRef.current && window.scrollY > 100)
    lastScrollRef.current = window.scrollY
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      transparencyController()
      hideController()
    })
  }, [])

  return (
    <header
      className={classNames(
        styles.content,
        transparent && styles.transparent,
        hidden && styles.hidden
      )}
    >
      <div>
        <Burger className={styles.burger} />
        <Logo className={styles.logo} />
      </div>
      <div>
        <nav>
          {navLinks.map(([name, url]) => (
            <Link key={url} href={url}>
              {name}
            </Link>
          ))}
        </nav>
        <CtaLink href="#" className={styles.cta} />
      </div>
    </header>
  )
}

export default Header
