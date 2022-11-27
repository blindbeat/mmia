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
import { motion, Variants } from "framer-motion"

type navLinkTuple = [name: string, url: string]

const navLinksFullscreen: navLinkTuple[] = [
  ["projects", "/projects"],
  ["about us", "/about"],
  ["career", "/career"],
  ["media", "/media"],
  ["contact", "/contact"],
]

const navLinksHeader: navLinkTuple[] = [
  ...navLinksFullscreen.slice(0, 2),
  navLinksFullscreen[navLinksFullscreen.length - 1],
]

const isScrolled = (scrollY: number) => scrollY !== 0

type navState = "hidden" | "transparent" | "header" | "fullscreen"

interface Props {
  adaptiveTransparency: boolean
}

function Header({ adaptiveTransparency }: Props) {
  const [navState, setNavState] = useState<navState>("header")
  const extendsThreshold = useThresholdObserver(1024)
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
      if (isFullscreenButton === true && navState !== "fullscreen") {
        setNavState("fullscreen")
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
  const [headerHeightInPercentage, setHeaderHeightInPercentage] = useState<
    number | null
  >(null)
  const calcHeaderRect = () => {
    const header = headerRef.current
    if (!header) return
    setHeaderHeightInPercentage(
      (header.getBoundingClientRect().height / window.innerHeight) * 100
    )
  }
  useEffect(() => {
    calcHeaderRect()
    window.addEventListener("resize", calcHeaderRect)
    return () => {
      window.removeEventListener("resize", calcHeaderRect)
    }
  }, [])

  useEffect(() => {
    const body = document.body
    if (navState === "fullscreen") {
      body.style.height = `100vh`
      body.style.overflowY = "hidden"
    } else {
      body.style.height = ""
      body.style.overflowY = ""
    }
  }, [navState])

  const defaultVariant = {
    y: "-100%",
    transition: {
      ease: "easeIn",
    },
  }
  const fullscreenLinkVariants: Variants = {
    header: defaultVariant,
    hidden: defaultVariant,
    transparent: defaultVariant,
    fullscreen: {
      y: "0",
      transition: {},
    },
  }

  const handleFullscreenButton = () => {
    navStateController(true)
  }
  const CornerComponent = extendsThreshold ? CtaLink : LanguageChangeButton

  return (
    <motion.nav
      className={classNames(styles.content)}
      animate={navState}
      initial={false}
      variants={{
        hidden: {
          clipPath: `polygon(0 0, 100% 0, 100% 0%, 0 0%)`,
          backgroundColor: "rgba(255,255,255, 1)",
        },
        transparent: {
          backgroundColor: "rgba(0,0,0,0)",
          clipPath: `polygon(0 0, 100% 0, 100% ${headerHeightInPercentage}%, 0 ${headerHeightInPercentage}%)`,
        },
        header: {
          backgroundColor: "rgba(255,255,255, 1)",
          clipPath: `polygon(0 0, 100% 0, 100% ${headerHeightInPercentage}%, 0 ${headerHeightInPercentage}%)`,
        },
        fullscreen: {
          backgroundColor: "#171717",
          clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
          transition: {
            duration: 0.4,
            staggerChildren: 0.075,
            when: "beforeChildren",
            ease: "easeInOut",
            backgroundColor: {
              duration: 0.3,
            },
          },
        },
      }}
      transition={{
        duration: 0.4,
        staggerChildren: 0.075,
        when: "afterChildren",
        ease: "easeInOut",
        backgroundColor: {
          duration: 0.3,
        },
      }}
    >
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
          {navLinksHeader.map(([name, url]) => (
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
      <div className={styles.fullscreenLinks}>
        {navLinksFullscreen.map(([name, url], index) => (
          <div
            key={url}
            className={styles.fullscreenLinkOuter}
            style={{
              paddingLeft: `calc(var(--linkGapStep) * ${
                (navLinksFullscreen.length - index + 1) % 5
              })`,
            }}
          >
            <motion.div
              className={styles.fullscreenLinkWrapper}
              variants={fullscreenLinkVariants}
              custom={index}
            >
              <span className={styles.fullscreenLinkIndex}>{`0${
                index + 1
              }`}</span>
              <Link href={url} className={styles.fullscreenLink}>
                {name}
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <motion.a
          href="mailto:info@aimm-group.com"
          animate={{
            opacity: 0.7,
          }}
          whileHover={{
            opacity: 1,
          }}
        >
          info@aimm-group.com
        </motion.a>
        <motion.a
          href="tel:+48510579590"
          animate={{
            opacity: 0.7,
          }}
          whileHover={{
            opacity: 1,
          }}
        >
          +48 (510) 579 7900
        </motion.a>
      </div>
    </motion.nav>
  )
}

export default Header
