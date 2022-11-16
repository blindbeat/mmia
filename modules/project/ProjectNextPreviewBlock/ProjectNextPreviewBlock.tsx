import Image from "next/image"
import NextProjectImage from "assets/dummyPics/project/blockPhotos/3.jpg"
import styles from "./ProjectNextPreviewBlock.module.css"
import { animated, useSpring } from "react-spring"
import ScreenTitle from "components/ScreenTitle"
import H2 from "components/H2"
import { title } from "assets/dummyText"
import { useCallback, useEffect, useRef } from "react"

const defaultStyleLeft = { x: -250, y: -25 }
const defaultStyleRight = { x: -25, y: -25 }
const defaultStyleText = { x: -232.5, y: -125 }

const defaultSpringConfig = {
  tension: 100,
  // mass: 2,
}

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

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const relativeX = event.clientX - rect.right
      const relativeY = event.clientY - rect.bottom
      apiLeft.start({ x: relativeX - 12.5, y: relativeY + 100, delay: 50 })
      apiRight.start({ x: relativeX + 212.5, y: relativeY + 100, delay: 70 })
      apiText.start({ x: relativeX, y: relativeY, delay: 65 })
    },
    [apiLeft, apiRight, apiText]
  )

  const handleMouseLeave = useCallback(() => {
    apiLeft.start(defaultStyleLeft)
    apiRight.start(defaultStyleRight)
    apiText.start(defaultStyleText)
  }, [apiLeft, apiRight, apiText])

  useEffect(() => {
    if (!ref.current) return
    ref.current.addEventListener("mousemove", handleMouseMove)
    ref.current.addEventListener("mouseleave", handleMouseLeave)
  }, [handleMouseLeave, handleMouseMove])

  return (
    <div ref={ref} className={styles.content}>
      <div className={styles.text}>
        <ScreenTitle>about company</ScreenTitle>
        <H2 className={styles.title}>{title}</H2>
      </div>
      <animated.div className={styles.eye} style={styleLeft} />
      <animated.div className={styles.eye} style={styleRight} />
      <animated.div className={styles.ctaTextContainer} style={styleText}>
        <span className={styles.ctaText}>*click to go*</span>
      </animated.div>
      <Image src={NextProjectImage} alt="" className={styles.image} />
    </div>
  )
}
