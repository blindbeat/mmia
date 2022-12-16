import styles from "./Navigation.module.css"
import Logo from "./assets/logo.svg"
import Link from "next/link"
import CtaLink from "./CtaLink"
import { useCallback, useEffect, useRef, useState } from "react"
import classNames from "classnames"
import { ComponentWithLineAdornment, LanguageChangeButton } from "components"
import NavLinkAnimated from "./NavLinkAnimated"
import {
  AnimatePresence,
  motion,
  MotionProps,
  Transition,
  Variants,
} from "framer-motion"
import Socials from "modules/blocks/Socials"
import { useThresholdObserver } from "hooks"

type navLinkTuple = [name: string, url: string, padding: number]

const navLinksFullscreen: navLinkTuple[] = [
  ["projects", "/projects", 1],
  ["about us", "/about", 0],
  ["building", "/building", 2],
  ["career", "/career", 3],
  ["media", "/media", 1],
  ["contact", "/contact", 2],
]
const navLinksHeader: navLinkTuple[] = [
  ...navLinksFullscreen.slice(0, 2),
  navLinksFullscreen[navLinksFullscreen.length - 1],
]

const isScrolled = (scrollY: number) => scrollY !== 0
type navState = "hidden" | "transparent" | "header"

const burgerPartsAnimation: MotionProps = {
  initial: {
    y: `-100%`,
  },
  animate: {
    y: `0%`,
  },
  exit: {
    y: "100%",
  },
  transition: {
    type: "tween",
  },
}
const headerNavAnimation: MotionProps = {
  initial: {
    y: "-50%",
    opacity: 0,
  },
  animate: {
    y: `0%`,
    opacity: 1,
  },
  exit: {
    y: "50%",
    opacity: 0,
  },
  transition: {
    duration: 0.3,
    type: "tween",
  },
}

interface Props {
  adaptiveTransparency: boolean
  adaptiveHidingBreakpoint: boolean | number
}

const MotionSocials = motion(Socials) as typeof motion.div
const Navigation = ({
  adaptiveTransparency,
  adaptiveHidingBreakpoint,
}: Props) => {
  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )

  const [adaptiveHidingState, setAdaptiveHidingState] = useState<boolean>(
    !!adaptiveHidingBreakpoint
  )
  const [navState, setNavState] = useState<navState | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenNavShouldBeVisible, setFullscreenNavShouldBeVisible] =
    useState(false)

  const headerRef = useRef<HTMLDivElement>(null)
  const [headerHeightInPercentage, setHeaderHeightInPercentage] = useState<
    number | null
  >(null)

  const extendsThreshold = useThresholdObserver(1024)

  const adaptiveHidingController = useCallback(() => {
    if (typeof adaptiveHidingBreakpoint === "boolean") return
    setAdaptiveHidingState(window.innerWidth < adaptiveHidingBreakpoint)
  }, [adaptiveHidingBreakpoint])
  useEffect(() => {
    if (typeof adaptiveHidingBreakpoint === "boolean")
      setAdaptiveHidingState(adaptiveHidingBreakpoint)
    else {
      adaptiveHidingController()
      window.addEventListener("resize", adaptiveHidingController)
      return () =>
        window.removeEventListener("resize", adaptiveHidingController)
    }
  }, [adaptiveHidingBreakpoint, adaptiveHidingController])

  const calcHeaderRect = useCallback(() => {
    const header = headerRef.current
    if (!header) return
    const height = header.getBoundingClientRect().height
    setHeaderHeightInPercentage((height / window.innerHeight) * 100)
  }, [])
  useEffect(() => {
    calcHeaderRect()
    window.addEventListener("resize", calcHeaderRect)
    return () => {
      window.removeEventListener("resize", calcHeaderRect)
    }
  }, [calcHeaderRect])
  const navStateController = useCallback(() => {
    if (!isScrolled(window.scrollY) && adaptiveTransparency) {
      setNavState("transparent")
    } else {
      setNavState(
        adaptiveHidingState &&
          window.scrollY > lastScrollRef.current &&
          window.scrollY > 100
          ? "hidden"
          : "header"
      )
    }
    lastScrollRef.current = window.scrollY
  }, [adaptiveHidingState, adaptiveTransparency])
  useEffect(() => {
    navStateController()
    window.addEventListener("scroll", navStateController)
    return () => {
      window.removeEventListener("scroll", navStateController)
    }
  }, [adaptiveTransparency, adaptiveHidingState, navStateController])

  useEffect(() => {
    const body = document.body
    if (isFullscreen) {
      body.style.height = `100vh`
      body.style.overflowY = "hidden"
    } else {
      body.style.height = ""
      body.style.overflowY = ""
    }
  }, [isFullscreen])

  const handleHeaderAnimationEnd = (definition: string) => {
    if (definition === "fullscreen") {
      setFullscreenNavShouldBeVisible(true)
    }
  }

  const startFullscreenCollapse = () => setFullscreenNavShouldBeVisible(false)
  const handleFullscreenButton = () => {
    if (!isFullscreen) {
      setIsFullscreen(true)
    } else {
      startFullscreenCollapse()
    }
  }
  const handleFullscreenNavClosed = () => {
    setIsFullscreen(false)
  }

  const contentVariants: Variants = {
    hidden: {
      clipPath: `polygon(0 0, 100% 0, 100% 0%, 0 0%)`,
      backgroundColor: "rgba(255,255,255, 1)",
    },
    transparent: {
      clipPath: `polygon(0 0, 100% 0, 100% ${headerHeightInPercentage}%, 0 ${headerHeightInPercentage}%)`,
      backgroundColor: "rgba(0,0,0,0)",
    },
    header: {
      clipPath: `polygon(0 0, 100% 0, 100% ${headerHeightInPercentage}%, 0 ${headerHeightInPercentage}%)`,
      backgroundColor: "rgba(255,255,255, 1)",
    },
    fullscreen: {
      clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
      backgroundColor: "rgba(23, 23, 23, 1)",
      transition: {
        duration: 0.6,
        staggerChildren: 0.075,
        when: "beforeChildren",
        ease: "easeInOut",
        backgroundColor: {
          duration: 0.3,
        },
      },
    },
  }
  const contentTransition: Transition = {
    duration: 0.6,
    staggerChildren: 0.075,
    when: "afterChildren",
    ease: "easeInOut",
    backgroundColor: {
      duration: 0.3,
    },
  }

  return (
    <motion.nav
      className={classNames(styles.content)}
      animate={isFullscreen ? "fullscreen" : navState ?? undefined}
      initial={{
        clipPath: `polygon(0 0, 100% 0, 100% 0%, 0 0%)`,
        backgroundColor: "rgba(0,0,0,0)",
      }}
      variants={contentVariants}
      transition={contentTransition}
      onAnimationComplete={handleHeaderAnimationEnd}
    >
      <header ref={headerRef}>
        <button
          onClick={handleFullscreenButton}
          className={classNames(styles.burger)}
        >
          <svg
            viewBox="0 0 47 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.2"
              d="M0.5 0.5H35C41.3513 0.5 46.5 5.64873 46.5 12C46.5 18.3513 41.3513 23.5 35 23.5H0.5V0.5Z"
              stroke="white"
            />
            <AnimatePresence>
              {isFullscreen ? (
                <motion.g {...burgerPartsAnimation}>
                  <line stroke="white" x1={15} y1={6} x2={27} y2={18} />
                  <line stroke="white" x1={27} y1={6} x2={15} y2={18} />
                </motion.g>
              ) : (
                <motion.g {...burgerPartsAnimation} key="lines">
                  <line key="1" x1="10" y1="9.5" x2="34" y2="9.5" />
                  <line key="2" x1="10" y1="13.5" x2="22" y2="13.5" />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </button>
        <Link
          href="/"
          className={classNames(styles.logo)}
          onClick={startFullscreenCollapse}
        >
          <Logo />
        </Link>
        <AnimatePresence mode="wait">
          {isFullscreen || fullscreenNavShouldBeVisible ? (
            <MotionSocials
              key="socialsModule"
              {...headerNavAnimation}
              className={styles.socialsHeader}
            />
          ) : (
            <motion.div
              key="allLinks"
              {...headerNavAnimation}
              className={styles.mainLinks}
            >
              {navLinksHeader.map(([name, url]) => (
                <NavLinkAnimated key={url} href={url}>
                  {name}
                </NavLinkAnimated>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        {extendsThreshold ? (
          <CtaLink
            handleCLick={startFullscreenCollapse}
            className={classNames(styles.corner)}
          />
        ) : (
          <LanguageChangeButton
            href="#"
            className={classNames(styles.corner)}
          />
        )}
      </header>
      <div className={styles.fullscreenLinks}>
        <AnimatePresence onExitComplete={handleFullscreenNavClosed}>
          {fullscreenNavShouldBeVisible &&
            navLinksFullscreen.map(([name, url, padding], index) => (
              <div
                key={url}
                className={styles.fullscreenLinkOuter}
                style={{
                  paddingLeft: `calc(var(--linkGapStep) * ${padding})`,
                }}
              >
                <motion.div
                  className={styles.fullscreenLinkWrapper}
                  initial={{ y: `-150%`, x: `-2rem`, rotate: -5 }}
                  animate={{ y: `0%`, x: `0rem`, rotate: 0 }}
                  exit={{
                    y: `150%`,
                    x: `2rem`,
                    rotate: 5,
                    transition: {
                      ease: "easeIn",
                      duration: 0.4,
                      delay: index * 0.1,
                    },
                  }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  custom={index}
                >
                  <span className={styles.fullscreenLinkIndex}>{`0${
                    index + 1
                  }`}</span>
                  <Link
                    href={url}
                    className={styles.fullscreenLink}
                    onClick={startFullscreenCollapse}
                  >
                    {name}
                  </Link>
                </motion.div>
              </div>
            ))}
        </AnimatePresence>
      </div>
      <div className={styles.link}>
        <ComponentWithLineAdornment as="button">
          drop request
        </ComponentWithLineAdornment>
      </div>
      <div className={styles.footer}>
        <motion.a
          className={styles.email}
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
          className={styles.phoneNumber}
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
        <Socials className={styles.socials} />
      </div>
    </motion.nav>
  )
}

export default Navigation
