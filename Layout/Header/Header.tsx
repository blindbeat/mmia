import styles from "./Header.module.css"
import Logo from "./assets/logo.svg"
import Burger from "./assets/burger.svg"
import Link from "next/link"
import CtaLink from "Layout/Header/CtaLink"
import { useEffect, useRef, useState } from "react"
import classNames from "classnames"
import LanguageChangeButton from "components/LanguageChangeButton"
import useThresholdObserver from "hooks/useThresholdObserver"

const navLinks: [name: string, url: string][] = [
  ["projects", "projects"],
  ["about us", "about"],
  ["contact", "contact"],
]

const defineTransparency = (scrollY: number) => scrollY === 0

function Header() {
  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )

  const [transparent, setTransparent] = useState(true)
  const [hidden, setHidden] = useState(false)
  const extendsThreshold = useThresholdObserver(1024)
  const transparencyController = () => {
    setTransparent(defineTransparency(window.scrollY))
  }

  const hideController = () => {
    if (window.scrollY === lastScrollRef.current) return
    setHidden(window.scrollY > lastScrollRef.current && window.scrollY > 100)
    lastScrollRef.current = window.scrollY
  }

  useEffect(() => {
    transparencyController()
    hideController()

    window.addEventListener("scroll", () => {
      transparencyController()
      hideController()
    })
  }, [])

  const CornerComponent = extendsThreshold ? CtaLink : LanguageChangeButton

  return (
    <header
      className={classNames(
        styles.content,
        transparent && styles.transparent,
        hidden && styles.hidden
      )}
    >
      <Burger className={classNames(styles.burger, "textAppear")} />
      <Link href="/" className={classNames(styles.logo, "textAppear")}>
        <Logo />
      </Link>
      <nav>
        {navLinks.map(([name, url]) => (
          <Link key={url} href={url} className="textAppear">
            {name}
          </Link>
        ))}
      </nav>
      <CornerComponent
        href="#"
        className={classNames(styles.corner, "textAppear")}
      />
    </header>
  )
}

export default Header
