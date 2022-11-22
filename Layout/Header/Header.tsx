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
  const [transparent, setTransparent] = useState(adaptiveTransparency)
  const [hidden, setHidden] = useState(false)
  const extendsThreshold = useThresholdObserver(1024)
  const [headerHeightInPercentage, setHeaderHeightInPercentage] = useState<
    number | null
  >(null)
  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )
  const transparencyController = () => {
    if (!adaptiveTransparency) setTransparent(false)
    else setTransparent(!isScrolled(window.scrollY))
  }

  const hideController = () => {
    if (window.scrollY === lastScrollRef.current) return
    setHidden(window.scrollY > lastScrollRef.current && window.scrollY > 100)
    lastScrollRef.current = window.scrollY
  }

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
  }, [adaptiveTransparency])

  const headerRef = useRef<HTMLDivElement | null>(null)

  const calcHeaderRect = () => {
    const header = headerRef.current
    if (!header) return
    setHeaderHeightInPercentage(
      header.getBoundingClientRect().height / window.innerHeight
    )
  }

  useEffect(() => {
    calcHeaderRect()
    window.addEventListener("resize", calcHeaderRect)
    return () => {
      window.removeEventListener("resize", calcHeaderRect)
    }
  }, [])

  const CornerComponent = extendsThreshold ? CtaLink : LanguageChangeButton

  return (
    <nav
      className={classNames(
        styles.content,
        adaptiveTransparency && transparent && styles.transparent,
        hidden && styles.hidden
      )}
      style={{
        clipPath: `url(#headerBg)`,
      }}
    >
      <header ref={headerRef}>
        <button className={classNames(styles.burger, utilStyles.textAppear)}>
          <Burger />
        </button>
        <Link
          href="/"
          className={classNames(styles.logo, utilStyles.textAppear)}
        >
          <Logo />
        </Link>
        <div className={styles.mainLinks}>
          {navLinks.map(([name, url]) => (
            <NavLinkAnimated
              key={url}
              href={url}
              className={utilStyles.textAppear}
            >
              {name}
            </NavLinkAnimated>
          ))}
        </div>
        <CornerComponent
          href="#"
          className={classNames(styles.corner, utilStyles.textAppear)}
        />
      </header>
      {headerHeightInPercentage !== null && (
        <BackgroundBlinder
          headerHeightInPercentage={headerHeightInPercentage * 100}
          state={hidden ? "none" : "header"}
        />
      )}
    </nav>
  )
}

export default Header
