import styles from "modules/blocks/Header/Header.module.css"
import Logo from "modules/blocks/Header/assets/logo.svg"
import Link from "next/link"
import CtaLink from "modules/blocks/Header/CtaLink"
import { useEffect, useRef, useState } from "react"
import classNames from "classnames"
import LanguageChangeButton from "components/LanguageChangeButton"
import useThresholdObserver from "hooks/useThresholdObserver"
import NavLinkAnimated from "./NavLinkAnimated"
import { AnimatePresence, motion, MotionProps, Variants } from "framer-motion"
import LinkWithLine from "components/LinkWithLine"
import Socials from "modules/blocks/Socials"
import { useRouter } from "next/router"

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
    type: "tween",
  },
}

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

interface Props {
  adaptiveTransparency: boolean
}

const MotionSocials = motion(Socials) as typeof motion.div
function Header({ adaptiveTransparency }: Props) {
  const { pathname } = useRouter()

  const lastScrollRef = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  )

  const [navState, setNavState] = useState<navState | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const headerRef = useRef<HTMLDivElement | null>(null)
  const [headerHeightInPercentage, setHeaderHeightInPercentage] = useState<
    number | null
  >(null)

  const extendsThreshold = useThresholdObserver(1024)

  const calcHeaderRect = () => {
    const header = headerRef.current
    if (!header) return
    setHeaderHeightInPercentage(
      (header.getBoundingClientRect().height / window.innerHeight) * 100
    )
  }
  const navStateController = () => {
    if (!isScrolled(window.scrollY) && adaptiveTransparency) {
      setNavState("transparent")
    } else {
      setNavState(
        window.scrollY > lastScrollRef.current && window.scrollY > 100
          ? "hidden"
          : "header"
      )
    }
    lastScrollRef.current = window.scrollY
  }

  useEffect(() => {
    navStateController()
    window.addEventListener("scroll", navStateController, {
      passive: true,
    })
    return () => {
      window.removeEventListener("scroll", navStateController)
    }
  }, [adaptiveTransparency])

  useEffect(() => {
    calcHeaderRect()
    window.addEventListener("resize", calcHeaderRect)
    return () => {
      window.removeEventListener("resize", calcHeaderRect)
    }
  }, [])

  useEffect(() => {
    setIsFullscreen(false)
  }, [pathname])

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

  const handleFullscreenButton = () => {
    setIsFullscreen((state) => !state)
  }
  const handleFullscreenLinkClick = () => setIsFullscreen(false)
  const CornerComponent = extendsThreshold ? CtaLink : LanguageChangeButton
  console.log(navState)
  return (
    <motion.nav
      className={classNames(styles.content)}
      animate={isFullscreen ? "fullscreen" : navState ?? undefined}
      initial={{
        clipPath: `polygon(0 0, 100% 0, 100% 0%, 0 0%)`,
        backgroundColor: "rgba(0,0,0,0)",
      }}
      variants={{
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
      }}
      transition={{
        duration: 0.6,
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
                <motion.path
                  {...burgerPartsAnimation}
                  key="close"
                  d="M15.1454 18.8534C15.1918 18.8998 15.247 18.9367 15.3077 18.9619C15.3684 18.987 15.4335 19 15.4992 19C15.5649 19 15.6299 18.987 15.6906 18.9619C15.7513 18.9367 15.8065 18.8998 15.8529 18.8534L21.9982 12.7087L28.1459 18.8534C28.2398 18.9472 28.367 18.9999 28.4997 18.9999C28.6324 18.9999 28.7596 18.9472 28.8535 18.8534C28.9473 18.7595 29 18.6323 29 18.4996C29 18.367 28.9473 18.2397 28.8535 18.1459L22.7057 12.0012L28.851 5.85399C28.9448 5.76017 28.9975 5.63293 28.9975 5.50025C28.9975 5.36758 28.9448 5.24034 28.851 5.14652C28.7571 5.05271 28.6299 5 28.4972 5C28.3645 5 28.2373 5.05271 28.1434 5.14652L21.9982 11.2937L15.8504 5.14902C15.7548 5.06711 15.6317 5.02431 15.5059 5.02917C15.38 5.03403 15.2607 5.08619 15.1716 5.17524C15.0826 5.26428 15.0304 5.38364 15.0255 5.50948C15.0207 5.63531 15.0635 5.75834 15.1454 5.85399L21.2907 12.0012L15.1454 18.1484C15.0523 18.2421 15 18.3688 15 18.5009C15 18.633 15.0523 18.7597 15.1454 18.8534Z"
                />
              ) : (
                <motion.g {...burgerPartsAnimation} key="lines">
                  <line key="1" x1="10" y1="9.5" x2="34" y2="9.5" />
                  <line key="2" x1="10" y1="13.5" x2="22" y2="13.5" />
                </motion.g>
              )}
            </AnimatePresence>
          </svg>
        </button>
        <Link href="/" className={classNames(styles.logo)}>
          <Logo />
        </Link>
        <AnimatePresence mode="wait">
          {isFullscreen ? (
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

        <CornerComponent href="#" className={classNames(styles.corner)} />
      </header>
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
              variants={fullscreenLinkVariants}
              custom={index}
            >
              <span className={styles.fullscreenLinkIndex}>{`0${
                index + 1
              }`}</span>
              <Link
                href={url}
                className={styles.fullscreenLink}
                onClick={handleFullscreenLinkClick}
              >
                {name}
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
      <div className={styles.link}>
        <LinkWithLine>drop request</LinkWithLine>
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

export default Header
