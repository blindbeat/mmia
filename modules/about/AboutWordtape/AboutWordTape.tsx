import styles from "./AboutWordTape.module.css"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Paragraph } from "components"

interface Props {
  tapes: [string, string]
  afterword: string
}

const AboutWordTape = ({ tapes, afterword }: Props) => {
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
        {tapes[0]}
      </motion.div>
      <motion.div
        className="h1"
        style={{
          x: secondY,
        }}
      >
        {tapes[1]}
      </motion.div>
      <Paragraph>{afterword}</Paragraph>
    </div>
  )
}

export default AboutWordTape
