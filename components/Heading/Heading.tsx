import { ComponentPropsWithoutRef, useEffect, useRef } from "react"
import SplitType from "split-type"
import styles from "./Heading.module.css"
import classNames from "classnames"
import { useInView } from "react-intersection-observer"
import { inViewOptions } from "misc/utils"

type ElemTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface Props extends ComponentPropsWithoutRef<"h1"> {
  children: string
  appearImmediately?: boolean
  delay?: number
  as: ElemTag
}

export const Heading = ({
  children,
  className,
  delay = 0,
  appearImmediately = false,
  as = "h2",
  ...rest
}: Props) => {
  const ref = useRef<HTMLElement | null>(null)

  const Component = as !== "h6" ? as : "h5"

  const { ref: observerRef, inView } = useInView(inViewOptions)

  useEffect(() => {
    if (ref.current === null) return
    const text = SplitType.create(ref.current, {
      types: "lines",
      lineClass: styles.animated,
    })
    text.lines?.forEach((line, index) => {
      const div = document.createElement("div")
      div.className = styles.wrapper

      line.before(div)
      div.append(line)
      line.style.animationDelay = `${delay + index * 0.1}s`
    })
  }, [delay])

  return (
    <Component
      {...rest}
      ref={(pointer) => {
        observerRef(pointer)
        ref.current = pointer
      }}
      className={classNames(
        as === "h6" && ".h6",
        styles.content,
        (inView || appearImmediately) && styles.appear,
        className
      )}
    >
      {children}
    </Component>
  )
}
