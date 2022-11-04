import styles from "./Header.module.css"
import Logo from "./assets/logo.svg"
import Burger from "./assets/burger.svg"
import Link from "next/link"
import CtaLink from "Layout/Header/CtaLink"
import { useEffect, useRef, useState } from "react"
import classNames from "classnames"
import LanguageChangeButton from "components/LanguageChangeButton"

const navLinks: [name: string, url: string][] = [
  ["projects", "projects"],
  ["about us", "about"],
  ["contact", "contact"],
]

const threshold = 768

const defineTransparency = (scrollY: number) => scrollY === 0
const defineExtendsThreshold = (windowWidth: number) => windowWidth > threshold

function Header() {
  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )

  const [transparent, setTransparent] = useState(true)
  const [hidden, setHidden] = useState(false)
  const [extendsThreshold, setExtendsThreshold] = useState(false)
  const transparencyController = () => {
    setTransparent(defineTransparency(window.scrollY))
  }

  const hideController = () => {
    if (window.scrollY === lastScrollRef.current) return
    setHidden(window.scrollY > lastScrollRef.current && window.scrollY > 100)
    lastScrollRef.current = window.scrollY
  }

  const thresholdController = () => {
    setExtendsThreshold(defineExtendsThreshold(window.innerWidth))
  }

  useEffect(() => {
    transparencyController()
    hideController()
    thresholdController()

    window.addEventListener("scroll", () => {
      transparencyController()
      hideController()
    })

    window.addEventListener("resize", thresholdController)
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
      <Logo className={classNames(styles.logo, "textAppear")} />
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
