import { ComponentPropsWithoutRef, useEffect, useRef } from "react"
import SplitType from "split-type"
import styles from "./H2.module.css"
import classNames from "classnames"
import { useInView } from "react-intersection-observer"
import { triggerDistance } from "utils"

interface Props extends ComponentPropsWithoutRef<"h2"> {
  children: string
  appearImmediate?: boolean
}

function H2({ children, className, appearImmediate = false, ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null)

  const { ref: observerRef, inView } = useInView({
    threshold: 1,
    rootMargin: `${triggerDistance}px`,
    triggerOnce: true,
  })

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
      line.style.animationDelay = `${index * 0.1}s`
    })
  }, [])

  return (
    <h2
      {...rest}
      ref={(pointer) => {
        observerRef(pointer)
        ref.current = pointer
      }}
      className={classNames(
        styles.content,
        (inView || appearImmediate) && styles.appear,
        className
      )}
    >
      {children}
    </h2>
  )
}

export default H2
