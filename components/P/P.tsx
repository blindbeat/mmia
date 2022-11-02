import { ComponentPropsWithoutRef } from "react"
import styles from "./P.module.css"
import classNames from "classnames"
import { useInView } from "react-intersection-observer"
import { triggerDistance } from "utils"

interface Props extends ComponentPropsWithoutRef<"p"> {
  appearImmediately?: boolean
  children: string
}

function P({ children, className, appearImmediately = false, ...rest }: Props) {
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: `-${triggerDistance}px`,
    triggerOnce: true,
  })

  return (
    <p
      {...rest}
      ref={ref}
      className={classNames(
        styles.content,
        (inView || appearImmediately) && styles.appear,
        className
      )}
    >
      {children}
    </p>
  )
}

export default P
