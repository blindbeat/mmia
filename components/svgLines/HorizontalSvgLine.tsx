import { motion } from "framer-motion"
import styles from "./SvgLine.module.css"

interface Props {
  row: number
  delay: number
}
export const HorizontalSvgLine = ({ row, delay }: Props) => {
  return (
    <motion.svg
      preserveAspectRatio="none"
      viewBox="0 0 100 1"
      animate="hidden"
      whileInView="visible"
      viewport={{
        once: true,
      }}
      style={{
        gridRow: row,
        gridColumn: "1 / -1",
      }}
      className={styles.horizontalSvg}
    >
      <motion.line
        variants={{
          hidden: {
            pathLength: 0,
          },
          visible: {
            pathLength: 1,
          },
        }}
        transition={{
          duration: 1.5,
          delay,
        }}
        x={0}
        y={0}
        x2={100}
        y2={0}
        stroke="rgb(200,200,200)"
        strokeWidth={1}
      ></motion.line>
    </motion.svg>
  )
}
