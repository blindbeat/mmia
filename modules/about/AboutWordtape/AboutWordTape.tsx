import styles from "./AboutWordTape.module.css"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { dummyParagraph } from "assets/dummyText"
import { Paragraph } from "components"

const tape =
  "We see architecture as a unique product, created at the intersection, "

const AboutWordTape = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const firstY = useTransform(
    scrollYProgress,
    [0, 1],
    [`calc(0% - 0)`, `calc(-100% + 100vw)`]
  )
  const secondY = useTransform(
    scrollYProgress,
    [0, 1],
    [`calc(0% - 0)`, `calc(100% - 100vw)`]
  )

  return (
    <div ref={ref} className={styles.content}>
      <motion.div
        className="h1"
        style={{
          x: firstY,
        }}
      >
        {tape}
      </motion.div>
      <motion.div
        className="h1"
        style={{
          x: secondY,
        }}
      >
        {tape}
      </motion.div>
      <Paragraph>{dummyParagraph}</Paragraph>
    </div>
  )
}

export default AboutWordTape
