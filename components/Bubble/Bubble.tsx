import styles from "components/Bubble/Bubble.module.css"
import { ComponentPropsWithoutRef, useRef } from "react"
import { useMove } from "@use-gesture/react"
import { animated, useSpring } from "react-spring"
import classNames from "classnames"

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

interface Props extends ComponentPropsWithoutRef<"div"> {
  index: number
  variant?: "papers" | "default"
  withIndex?: boolean
}

function Bubble({
  index,
  children,
  className,
  variant = "default",
  withIndex = false,
  ...rest
}: Props) {
  const ref = useRef<null | HTMLDivElement>(null)
  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useMove((state) => {
    if (!ref.current) return
    const [x, y] = calcOffset(state.xy, ref.current)
    api.start({ x, y })
  })

  const style = {
    x,
    y,
  }

  return (
    <div
      ref={ref}
      className={classNames(
        styles.bubbleWrapper,
        variant === "papers" && styles.papers
      )}
      {...rest}
      {...bind()}
      onMouseLeave={() => api.start({ x: 0, y: 0 })}
    >
      <animated.div
        className={classNames(styles.bubble, className)}
        style={style}
      >
        <animated.div className={styles.bubbleText} style={style}>
          {withIndex && (
            <span className={styles.bubbleIndex}>{`0${index + 1}.`}</span>
          )}
          {children}
        </animated.div>
      </animated.div>
    </div>
  )
}

export default Bubble
