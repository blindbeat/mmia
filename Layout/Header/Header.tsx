import styles from "./Header.module.css"
import utilStyles from "styles/utils.module.css"
import Logo from "./assets/logo.svg"
import Burger from "./assets/burger.svg"
import Link from "next/link"
import CtaLink from "./CtaLink"
import { useEffect, useRef, useState } from "react"
import classNames from "classnames"
import LanguageChangeButton from "components/LanguageChangeButton"
import useThresholdObserver from "hooks/useThresholdObserver"
import NavLinkAnimated from "./NavLinkAnimated"
import BackgroundBlinder from "Layout/Header/BackgroundBlinder"

const navLinks: [name: string, url: string][] = [
  ["projects", "/projects"],
  ["about us", "/about"],
  ["contact", "/contact"],
]

const isScrolled = (scrollY: number) => scrollY !== 0

interface Props {
  adaptiveTransparency: boolean
}

function Header({ adaptiveTransparency }: Props) {
  const [transparent, setTransparent] = useState(true)
  const [hidden, setHidden] = useState(false)
  const extendsThreshold = useThresholdObserver(1024)
  const [headerHeight, setHeaderHeight] = useState<number | null>(null)
  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )
  const transparencyController = () => {
    setTransparent(!isScrolled(window.scrollY))
  }

  const hideController = () => {
    if (window.scrollY === lastScrollRef.current) return
    setHidden(window.scrollY > lastScrollRef.current && window.scrollY > 100)
    lastScrollRef.current = window.scrollY
  }

  const headerRef = useRef<HTMLDivElement | null>(null)

  const calcRect = () => {
    const header = headerRef.current
    if (!header) return
    setHeaderHeight(header.getBoundingClientRect().height / window.innerHeight)
  }

  useEffect(() => {
    calcRect()
    window.addEventListener("resize", calcRect)
    return () => {
      window.removeEventListener("resize", calcRect)
    }
  }, [])

  useEffect(() => {
    transparencyController()
    hideController()

    window.addEventListener(
      "scroll",
      () => {
        transparencyController()
        hideController()
      },
      {
        passive: true,
      }
    )
    return () => {
      window.removeEventListener("scroll", () => {
        transparencyController()
        hideController()
      })
    }
  }, [])

  const CornerComponent = extendsThreshold ? CtaLink : LanguageChangeButton

  return (
    <header
      ref={headerRef}
      className={classNames(
        styles.content,
        adaptiveTransparency && transparent && styles.transparent,
        hidden && styles.hidden
      )}
      style={{
        clipPath: !transparent ? `url(#headerBg)` : undefined,
      }}
    >
      <button className={classNames(styles.burger, utilStyles.textAppear)}>
        <Burger />
      </button>
      <Link href="/" className={classNames(styles.logo, utilStyles.textAppear)}>
        <Logo />
      </Link>
      <nav>
        {navLinks.map(([name, url]) => (
          <NavLinkAnimated
            key={url}
            href={url}
            className={utilStyles.textAppear}
          >
            {name}
          </NavLinkAnimated>
        ))}
      </nav>
      <CornerComponent
        href="#"
        className={classNames(styles.corner, utilStyles.textAppear)}
      />
      {headerHeight !== null && (
        <BackgroundBlinder
          headerHeightInPercentage={headerHeight * 100}
          state={hidden ? "transparent" : "header"}
          color={transparent ? "transparent" : "white"}
        />
      )}
    </header>
  )
}

export default Header
