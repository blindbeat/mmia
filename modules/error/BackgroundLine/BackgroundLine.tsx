import { motion } from "framer-motion"
import styles from "./BackgroundLine.module.css"

export const BackgroundLine = () => {
  return (
    <svg
      viewBox="0 0 1920 1080"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.backgroundLine}
    >
      <motion.path
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: 1,
        }}
        transition={{
          duration: 7,
        }}
        opacity="0.1"
        d="M1937.9 302.368C1663.5 100.208 1239.06 469.754 973.452 895.533C735.009 1293.87 868.773 1484.84 1403.48 1144.09C2594.76 322.915 -412.654 1083.95 -8.14016 320.264C-12.2654 395.411 -91.7163 189.436 211.254 161.187C514.223 132.939 464.994 -5.8367 443.245 -21.0884"
        stroke="white"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
