import Link, { LinkProps } from "next/link"
import { ComponentPropsWithoutRef, useRef, useState } from "react"
import classNames from "classnames"
import styles from "./NavLinkAnimated.module.css"

type AnimationState = "appearing" | "appeared" | "hiding" | "hidden"
type AnimationName = "appear" | "hide"

export default function NavLinkAnimated({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"a"> & LinkProps) {
  const [animation, setAnimation] = useState<AnimationName | null>(null)
  const animationStateRef = useRef<AnimationState>("hidden")
  const hoveredRef = useRef<boolean>(false)

  const handleMouseEnter = () => {
    hoveredRef.current = true
    const state = animationStateRef.current
    if (state === "hidden") {
      setAnimation("appear")
      animationStateRef.current = "appearing"
    }
  }

  const handleMouseLeave = () => {
    hoveredRef.current = false
    const state = animationStateRef.current
    if (state === "appeared") {
      setAnimation("hide")
      animationStateRef.current = "hiding"
    }
  }

  const handleAnimationEnd = () => {
    const state = animationStateRef.current
    const hovered = hoveredRef.current
    if (state === "appearing") {
      if (hovered) animationStateRef.current = "appeared"
      else {
        setAnimation("hide")
        animationStateRef.current = "hiding"
      }
    } else if (state === "hiding") {
      if (!hovered) animationStateRef.current = "hidden"
      else {
        setAnimation("appear")
        animationStateRef.current = "appearing"
      }
    }
  }

  return (
    <Link
      className={classNames(styles.link, className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onAnimationEnd={handleAnimationEnd}
      {...rest}
    >
      <span className={styles.text}>
        {children}
        <svg
          viewBox="0 0 100 1"
          className={classNames(
            styles.lineSvg,
            animation === "appear" && styles.appearLine,
            animation === "hide" && styles.hideLine
          )}
        >
          <line
            x1="0"
            y1="0"
            x2="100"
            y2="1"
            vectorEffect="non-scaling-stroke"
            strokeDasharray={2}
          ></line>
        </svg>
      </span>
    </Link>
  )
}
