import Image from "next/image"
import NextProjectImage from "assets/dummyPics/project/blockPhotos/3.jpg"
import styles from "./ProjectNextPreviewBlock.module.css"
import { animated, useSpring } from "react-spring"
import ScreenTitle from "components/ScreenTitle"
import Heading from "components/Heading"
import { title } from "assets/dummyText"
import { useCallback, useEffect, useRef } from "react"
import classNames from "classnames"

const defaultStyleLeft = { x: -200, y: -25 }
const defaultStyleRight = { x: 0, y: -25 }
const defaultStyleText = { x: -200, y: -125 }

const defaultSpringConfig = {
  tension: 100,
}

const eyeRadius = 100

export default function ProjectNextPreviewBlock() {
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
    return () => window.removeEventListener("resize", handleResize)
  }, [handleMouseLeave, handleMouseMove, handleResize, parkEyes])

  return (
    <div ref={ref} className={styles.content}>
      <div className={styles.text}>
        <ScreenTitle>about company</ScreenTitle>
        <Heading as="h2" className={styles.title}>
          {title}
        </Heading>
      </div>
      <svg className={styles.svg}>
        <clipPath id="eyeClip">
          <animated.circle cx={styleLeft.x} cy={styleLeft.y} r={100} />
          <animated.circle cx={styleRight.x} cy={styleRight.y} r={100} />
        </clipPath>
      </svg>
      <animated.div className={styles.ctaTextContainer} style={styleText}>
        <span className={styles.ctaText}>*click to go*</span>
      </animated.div>
      <Image
        src={NextProjectImage}
        alt=""
        className={classNames(styles.image, styles.imageEyesClip)}
        style={{
          clipPath: `url(#eyeClip)`,
        }}
      />
      <Image
        src={NextProjectImage}
        alt=""
        className={classNames(styles.image, styles.imageBackground)}
      />
    </div>
  )
}
