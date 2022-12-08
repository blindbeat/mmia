import { motion } from "framer-motion"
import styles from "./SvgLine.module.css"

interface Props {
  column: number
  rowsAmount: number
  lineProgress: number
  delay: number
}
export const VerticalSvgLine = ({
  column,
  rowsAmount,
  lineProgress,
  delay,
}: Props) => {
  console.log(lineProgress)
  return (
    <svg
      preserveAspectRatio="none"
      viewBox="0 0 1 100"
      style={{
        gridRow: `1 / span ${rowsAmount}`,
        gridColumn: column,
      }}
      className={styles.verticalSvg}
    >
      <motion.line
        initial={{
          pathLength: 0,
        }}
        animate={{
          pathLength: lineProgress,
        }}
        transition={{
          duration: 1.5,
          delay,
        }}
        // vectorEffect="non-scaling-stroke"
        x={0}
        y={0}
        x2={0}
        y2={100}
        strokeWidth={1}
        stroke="rgb(200,200,200)"
      ></motion.line>
    </svg>
  )
}
