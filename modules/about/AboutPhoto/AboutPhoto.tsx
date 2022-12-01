import styles from "./AboutPhoto.module.css"
import Image from "next/image"
import photo from "assets/dummyPics/greetiongPhotos/3.jpg"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const height = 200

const AboutPhoto = () => {
  console.log(`-${(height - 100) / height}%`)
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
    <div ref={ref} className={styles.content}>
      <motion.div
        style={{
          height: `${height}%`,
          y,
        }}
        className={styles.imageWrapper}
      >
        <Image src={photo} alt="" className={styles.image} />
      </motion.div>
    </div>
  )
}

export default AboutPhoto
