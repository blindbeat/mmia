import styles from "./Bubble.module.css"
import { ComponentPropsWithoutRef, MouseEvent } from "react"
import classNames from "classnames"
import { motion, useSpring } from "framer-motion"
import { SpringOptions } from "popmotion"

type CoordsTuple = [x: number, y: number]

function calcOffset(pointer: CoordsTuple, target: HTMLDivElement) {
  const relativeOffset = calcRelativeOffset(pointer, target)
  const padding = calcPadding(target)
  return relativeOffset.map(
    (offset, index) => offset * padding[index] * 2
  ) as CoordsTuple
}

function calcRelativeOffset(pointer: CoordsTuple, target: HTMLDivElement) {
  const rect = target.getBoundingClientRect()
  const x = (pointer[0] - rect.x) / rect.width - 0.5
  const y = (pointer[1] - rect.y) / rect.height - 0.5
  return [x, y]
}
function calcPadding(target: HTMLDivElement) {
  const styles = window.getComputedStyle(target)
  return [
    parseInt(styles.getPropertyValue("padding-left")),
    parseInt(styles.getPropertyValue("padding-top")),
  ]
}

const springOptions: SpringOptions = {
  stiffness: 75,
  mass: 0.02,
}

interface Props extends ComponentPropsWithoutRef<"div"> {
  index: number
  variant?: "papers" | "default"
  withIndex?: boolean
}

export const Bubble = ({
  index,
  children,
  className,
  variant = "default",
  withIndex = false,
  ...rest
}: Props) => {
  const x = useSpring(0, springOptions)
  const y = useSpring(0, springOptions)

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const [xOffset, yOffset] = calcOffset(
      [event.clientX, event.clientY],
      event.currentTarget
    )
    x.set(xOffset)
    y.set(yOffset)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const style = {
    x,
    y,
  }

  return (
    <div
      className={classNames(
        styles.bubbleWrapper,
        variant === "papers" && styles.papers
      )}
      onMouseMove={handleMouseMove}
      {...rest}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={classNames(styles.bubble, className)}
        style={style}
      >
        <motion.div className={styles.bubbleText} style={style}>
          {withIndex && (
            <span className={styles.bubbleIndex}>{`0${index + 1}.`}</span>
          )}
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}
