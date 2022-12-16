/* eslint-disable jsx-a11y/alt-text */
import Image, { ImageProps } from "next/image"
import classNames from "classnames"
import styles from "./ImageWithParallax.module.css"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const height = 200

export const ImageWithParallax = ({ className, ...rest }: ImageProps) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${((height - 100) / height) * 100}%`, `0%`]
  )
  return (
    <div ref={ref} className={classNames(styles.content, className)}>
      <motion.div
        style={{
          height: `${height}%`,
          y,
        }}
        className={styles.imageWrapper}
      >
        <Image {...rest} className={styles.image} />
      </motion.div>
    </div>
  )
}
