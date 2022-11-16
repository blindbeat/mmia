import Image from "next/image"
import NextProjectImage from "assets/dummyPics/project/blockPhotos/3.jpg"
import styles from "./ProjectNextPreviewBlock.module.css"
import { useMove } from "@use-gesture/react"
import { animated, useSpring } from "react-spring"
import ScreenTitle from "components/ScreenTitle"
import H2 from "components/H2"
import { title } from "assets/dummyText"

export default function ProjectNextPreviewBlock() {
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))
  const bind = useMove(({ xy, currentTarget }) => {
    const target = currentTarget as HTMLDivElement
    const rect = target.getBoundingClientRect()
    const relativeX = xy[0] - rect.left
    const relativeY = xy[1] - rect.top
    api.start({ x: relativeX - 200, y: relativeY - 100 })
  })
  return (
    <div className={styles.content} {...bind()}>
      <div className={styles.text}>
        <ScreenTitle>about company</ScreenTitle>
        <H2 className={styles.title}>{title}</H2>
      </div>
      <animated.div className={styles.eyes} style={{ x, y }}>
        <div className={styles.eye} />
        <div className={styles.eye} />
        <span className={styles.ctaText}>*click to go*</span>
      </animated.div>
      <Image src={NextProjectImage} alt="" className={styles.image} />
    </div>
  )
}
