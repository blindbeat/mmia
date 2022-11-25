import styles from "./Header.module.css"
import utilStyles from "styles/utils.module.css"
import Logo from "./assets/logo.svg"
import Burger from "./assets/burger.svg"
import Link from "next/link"
import CtaLink from "./CtaLink"
import { useCallback, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import LanguageChangeButton from "components/LanguageChangeButton"
import useThresholdObserver from "hooks/useThresholdObserver"
import NavLinkAnimated from "./NavLinkAnimated"
import { motion } from "framer-motion"

const navLinks: [name: string, url: string][] = [
  ["projects", "/projects"],
  ["about us", "/about"],
  ["contact", "/contact"],
]

const isScrolled = (scrollY: number) => scrollY !== 0

type navState = "hidden" | "transparent" | "header" | "fullscreen"

interface Props {
  adaptiveTransparency: boolean
}

function Header({ adaptiveTransparency }: Props) {
  const [navState, setNavState] = useState<navState>("header")
  const extendsThreshold = useThresholdObserver(1024)
  const [headerHeightInPercentage, setHeaderHeightInPercentage] = useState<
    number | null
  >(null)
  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )

  const navStateController = useCallback(
    (isFullscreenButton?: boolean | Event) => {
      const calcState = () => {
        if (!isScrolled(window.scrollY) && adaptiveTransparency) {
          setNavState("transparent")
        } else {
          setNavState(
            window.scrollY > lastScrollRef.current && window.scrollY > 100
              ? "hidden"
              : "header"
          )
        }
      }
      if (isFullscreenButton === true) {
        if (navState !== "fullscreen") setNavState("fullscreen")
        else calcState()
      } else {
        calcState()
      }
      lastScrollRef.current = window.scrollY
    },
    [adaptiveTransparency, navState]
  )

  useEffect(() => {
    window.addEventListener("scroll", navStateController, {
      passive: true,
    })
    return () => {
      window.removeEventListener("scroll", navStateController)
    }
  }, [adaptiveTransparency, navStateController])

  const headerRef = useRef<HTMLDivElement | null>(null)

  const calcHeaderRect = () => {
    const header = headerRef.current
    if (!header) return
    setHeaderHeightInPercentage(
      (header.getBoundingClientRect().height / window.innerHeight) * 100
    )
  }

  // const styleAnimation = useAnimateNavigation({
  //   state: navState,
  //   headerHeightInPercentage: headerHeightInPercentage ?? 0,
  //   animationLength: 200,
  // })

  useEffect(() => {
    calcHeaderRect()
    window.addEventListener("resize", calcHeaderRect)
    return () => {
      window.removeEventListener("resize", calcHeaderRect)
    }
  }, [])

  const handleFullscreenButton = () => {
    navStateController(true)
  }

  console.log(navState)

  const CornerComponent = extendsThreshold ? CtaLink : LanguageChangeButton
  return (
    <motion.nav
      className={classNames(styles.content)}
      animate={navState}
      variants={{
        hidden: {
          clipPath: `polygon(0 0, 100% 0, 100% 0%, 0 0%)`,
        },
        transparent: {
          clipPath: `polygon(0 0, 100% 0, 100% ${headerHeightInPercentage}%, 0 ${headerHeightInPercentage}%)`,
        },
        header: {
          clipPath: `polygon(0 0, 100% 0, 100% ${headerHeightInPercentage}%, 0 ${headerHeightInPercentage}%)`,
        },
        fullscreen: {
          clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
        },
      }}
      transition={{
        ease: "easeInOut",
        duration: 0.6,
      }}
    >
      <motion.div
        className={styles.background}
        variants={{
          hidden: {
            backgroundColor: "rgb(255,255,255)",
            opacity: 1,
          },
          transparent: {
            opacity: 0,
          },
          header: {
            backgroundColor: "rgb(255,255,255)",
            opacity: 1,
          },
          fullscreen: {
            backgroundColor: "rgb(0,0,0)",
            opacity: 1,
          },
        }}
        transition={{
          ease: "easeInOut",
          opacity: {
            duration: 0.2,
            backgroundColor: 0.4,
          },
        }}
      />
      <header ref={headerRef}>
        <button
          onClick={handleFullscreenButton}
          className={classNames(styles.burger, utilStyles.textAppear)}
        >
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
      {/*<nav></nav>*/}
    </motion.nav>
  )
}

export default Header
