import { ComponentPropsWithoutRef } from "react"
import styles from "./Paragraph.module.css"
import classNames from "classnames"
import { useInView } from "react-intersection-observer"
import { inViewOptions } from "misc/utils"

interface Props extends ComponentPropsWithoutRef<"p"> {
  appearImmediately?: boolean
  delay?: number
}

function Paragraph({
  children,
  className,
  appearImmediately = false,
  delay,
  ...rest
}: Props) {
  const { ref, inView } = useInView(inViewOptions)

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

export default Paragraph
