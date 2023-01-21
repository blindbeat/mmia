import styles from "./PhotoWithEyes.module.css"
import { animated, useSpring } from "react-spring"
import Image from "next/image"
import classNames from "classnames"
import {
  ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { NextImageSrc } from "types"

const defaultStyleLeft = { x: -200, y: -25 }
const defaultStyleRight = { x: 0, y: -25 }
const defaultStyleText = { x: -200, y: -125 }

const defaultSpringConfig = {
  tension: 100,
}

const eyeRadius = 100

interface Props extends ComponentPropsWithoutRef<"div"> {
  image: NextImageSrc
  ctaText?: string
}
export const PhotoWithEyes = ({
  image,
  children,
  ctaText,
  className,
}: Props) => {
  const [visible, setVisible] = useState(false)
  const [styleLeft, apiLeft] = useSpring(
    { ...defaultStyleLeft, config: defaultSpringConfig },
    []
  )
  const [styleRight, apiRight] = useSpring(
    { ...defaultStyleRight, config: defaultSpringConfig },
    []
  )
  const [styleText, apiText] = useSpring(
    { ...defaultStyleText, config: defaultSpringConfig },
    []
  )
  const ref = useRef<null | HTMLDivElement>(null)

  const parkEyes = useCallback(
    (elem: HTMLDivElement, immediate = false, withDelay = true) => {
      const rect = elem.getBoundingClientRect()
      apiLeft.start({
        x: rect.width - eyeRadius * 3.5,
        y: rect.height - eyeRadius * 1.5,
        delay: withDelay ? 50 : undefined,
        immediate,
      })
      apiRight.start({
        x: rect.width - eyeRadius * 1.5,
        y: rect.height - eyeRadius * 1.5,
        delay: withDelay ? 100 : undefined,
        immediate,
      })
      apiText.start({
        x: rect.width - eyeRadius * 2.5,
        y: rect.height - eyeRadius * 1.5,
        delay: withDelay ? 100 : undefined,
        immediate,
      })
    },
    [apiLeft, apiRight, apiText]
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const relativeX = event.clientX - rect.left
      const relativeY = event.clientY - rect.top
      apiLeft.start({ x: relativeX - eyeRadius, y: relativeY, delay: 50 })
      apiRight.start({ x: relativeX + eyeRadius, y: relativeY, delay: 100 })
      apiText.start({ x: relativeX, y: relativeY, delay: 75 })
    },
    [apiLeft, apiRight, apiText]
  )

  const handleResize = useCallback(() => {
    if (!ref.current) return
    parkEyes(ref.current, true, false)
  }, [parkEyes])

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return
    parkEyes(ref.current)
  }, [parkEyes])

  useEffect(() => {
    if (!ref.current) return
    parkEyes(ref.current, true)
    ref.current.addEventListener("mousemove", handleMouseMove)
    ref.current.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", handleResize)
    setTimeout(() => {
      setVisible(true)
    }, 100)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleMouseLeave, handleMouseMove, handleResize, parkEyes])
  return (
    <div ref={ref} className={classNames(styles.container, className)}>
      {children}
      <svg className={styles.svg}>
        <clipPath id="eyeClip">
          <animated.circle cx={styleLeft.x} cy={styleLeft.y} r={100} />
          <animated.circle cx={styleRight.x} cy={styleRight.y} r={100} />
        </clipPath>
      </svg>
      {ctaText && (
        <animated.div className={styles.ctaTextContainer} style={styleText}>
          <span className={styles.ctaText}>{ctaText}</span>
        </animated.div>
      )}
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        style={{
          visibility: visible ? "visible" : "hidden",
          clipPath: `url(#eyeClip)`,
        }}
        className={classNames(styles.image, styles.imageEyesClip)}
      />
    </div>
  )
}
