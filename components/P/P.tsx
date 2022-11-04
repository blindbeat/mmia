import { ComponentPropsWithoutRef } from "react"
import styles from "./P.module.css"
import classNames from "classnames"
import { useInView } from "react-intersection-observer"

interface Props extends ComponentPropsWithoutRef<"p"> {
  appearImmediately?: boolean
  children: string
  delay?: number
}

function P({
  children,
  className,
  appearImmediately = false,
  delay,
  ...rest
}: Props) {
  const { ref, inView } = useInView({
    threshold: 1,
    // rootMargin: `-${triggerDistance}px`,
    triggerOnce: true,
  })

  console.log(inView)

  return (
    <p
      {...rest}
      ref={ref}
      className={classNames(
        styles.content,
        (inView || appearImmediately) && styles.appear,
        className
      )}
      style={{
        animationDelay: delay ? `${delay}s` : undefined,
      }}
    >
      {children}
    </p>
  )
}

export default P
