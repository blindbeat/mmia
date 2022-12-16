import styles from "./Navigation.module.css"
import Logo from "./assets/logo.svg"
import Link from "next/link"
import CtaLink from "./CtaLink"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import classNames from "classnames"
import { ComponentWithLineAdornment, LanguageChangeButton } from "components"
import NavLinkAnimated from "./NavLinkAnimated"
import {
  AnimatePresence,
  motion,
  MotionProps,
  useSpring,
  useTransform,
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
  navFullscreenSetter: Dispatch<SetStateAction<boolean>>
}

interface RectSize {
  width: number
  height: number
}

const MotionSocials = motion(Socials) as typeof motion.div

const Navigation = ({
  adaptiveTransparency,
  adaptiveHidingBreakpoint,
  navFullscreenSetter,
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
  const [windowRect, setWindowRect] = useState<RectSize>({
    width: 0,
    height: 0,
  })
  const [headerHeight, setHeaderHeight] = useState(0)

  const rectSetter = useCallback(() => {
    if (!headerRef.current) throw new Error(`header not found`)
    setHeaderHeight(headerRef.current.getBoundingClientRect().height)
    setWindowRect({ width: window.innerWidth, height: window.innerHeight })
  }, [])

  useEffect(() => {
    rectSetter()
    window.addEventListener("resize", rectSetter)
    return () => {
      window.removeEventListener("resize", rectSetter)
    }
  }, [rectSetter])

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
    navFullscreenSetter(isFullscreen)
  }, [isFullscreen, navFullscreenSetter])

  const handleHeaderAnimationEnd = (definition: string) => {
    if (definition === "fullscreen") {
      setFullscreenNavShouldBeVisible(true)
    }
  }

  const springValueHard = useSpring(10, {
    damping: 20,
    stiffness: 150,
  })
  const springValueSoft = useSpring(10, {
    damping: 20,
  })

  const springValueTransformed = useTransform(
    [springValueHard, springValueSoft],
    ([springValueHard, springValueSoft]) =>
      `path('M 0 0 L ${windowRect.width} 0 L ${
        windowRect.width
      } ${springValueSoft} Q ${
        windowRect.width / 2
      } ${springValueHard} 0 ${springValueSoft} Z')`
  )

  useEffect(() => {
    const value = isFullscreen
      ? windowRect.height
      : navState === "header" || navState === "transparent"
      ? headerHeight
      : 0

    springValueHard.set(value)
    springValueSoft.set(value)
  }, [
    headerHeight,
    isFullscreen,
    navState,
    springValueHard,
    springValueSoft,
    windowRect.height,
  ])

  const startFullscreenCollapse = () => setFullscreenNavShouldBeVisible(false)
  const startParallelFullscreenCollapse = () => {
    setFullscreenNavShouldBeVisible(false)
    setIsFullscreen(false)
  }
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

  return (
    <motion.nav
      className={classNames(styles.content)}
      animate={isFullscreen ? "fullscreen" : navState ?? undefined}
      initial={{
        backgroundColor: "rgba(0,0,0,0)",
      }}
      style={{
        clipPath: springValueTransformed,
      }}
      variants={{
        hidden: {
          backgroundColor: "rgba(255,255,255, 1)",
        },
        transparent: {
          backgroundColor: "rgba(0,0,0,0)",
        },
        header: {
          backgroundColor: "rgba(255,255,255, 1)",
        },
        fullscreen: {
          backgroundColor: "rgba(23, 23, 23, 1)",
        },
      }}
      transition={{
        delay: 0.1,
        duration: 0.4,
      }}
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
            handleCLick={startParallelFullscreenCollapse}
            className={classNames(styles.corner)}
          />
        ) : (
          <LanguageChangeButton
            href="#"
            className={classNames(styles.corner)}
          />
        )}
      </header>
      <div className={styles.fullscreenContent}>
        <AnimatePresence onExitComplete={handleFullscreenNavClosed}>
          {fullscreenNavShouldBeVisible && (
            <>
              <div className={styles.fullscreenLinks}>
                {navLinksFullscreen.map(([name, url, padding], index) => (
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
              </div>
              <div
                key="link"
                onClick={startFullscreenCollapse}
                className={styles.link}
              >
                <motion.div
                  initial={{ y: `-175%`, x: `-2rem`, rotate: -5 }}
                  animate={{ y: `0%`, x: `0rem`, rotate: 0 }}
                  exit={{
                    y: `150%`,
                    x: `2rem`,
                    rotate: 5,
                    transition: {
                      ease: "easeIn",
                      duration: 0.4,
                      delay: (navLinksFullscreen.length + 1) * 0.1,
                    },
                  }}
                  transition={{
                    duration: 0.6,
                    delay: (navLinksFullscreen.length + 1) * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <ComponentWithLineAdornment as="button">
                    drop request
                  </ComponentWithLineAdornment>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>
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
