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
import useAnimateNavigation from "hooks/useAnimateNavigation"

const navLinks: [name: string, url: string][] = [
  ["projects", "/projects"],
  ["about us", "/about"],
  ["contact", "/contact"],
]

const isScrolled = (scrollY: number) => scrollY !== 0

type navState = "hidden" | "header" | "fullscreen"

interface Props {
  adaptiveTransparency: boolean
}

function Header({ adaptiveTransparency }: Props) {
  const [transparent, setTransparent] = useState(adaptiveTransparency)
  const [navState, setNavState] = useState<navState>("header")
  const extendsThreshold = useThresholdObserver(1024)
  const [headerHeightInPercentage, setHeaderHeightInPercentage] = useState<
    number | null
  >(null)
  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )
  const transparencyController = () => {
    setTransparent(!isScrolled(window.scrollY))
  }

  const navStateController = () => {
    // if (isButton && navState !== 'fullscreen') setNavState('fullscreen')
    // if (isButton && navState === 'fullscreen') setNavState('fullscreen')
    // if (window.scrollY === lastScrollRef.current) return
    // console.log(window.scrollY, lastScrollRef.current)
    setNavState(
      window.scrollY > lastScrollRef.current && window.scrollY > 100
        ? "hidden"
        : "header"
    )
    lastScrollRef.current = window.scrollY
  }

  useEffect(() => {
    window.addEventListener("scroll", navStateController, {
      passive: true,
    })
    setTransparent(adaptiveTransparency)
    if (adaptiveTransparency) {
      window.addEventListener("scroll", transparencyController, {
        passive: true,
      })
    }

    return () => {
      window.removeEventListener("scroll", navStateController)
      window.removeEventListener("scroll", transparencyController)
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

  const path = useAnimateNavigation({
    state: navState,
    headerHeightInPercentage: headerHeightInPercentage! * 100,
  })

  console.log(path)

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
        navState === "hidden" && styles.hidden
      )}
      style={{
        clipPath: `path("${path}")`,
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
      <div></div>
      {headerHeightInPercentage !== null && (
        <BackgroundBlinder
          headerHeightInPercentage={headerHeightInPercentage * 100}
          state={navState}
        />
      )}
    </nav>
  )
}

export default Header
