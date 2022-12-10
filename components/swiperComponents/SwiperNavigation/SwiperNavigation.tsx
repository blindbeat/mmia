import classNames from "classnames"
import styles from "./SwiperNavigation.module.css"
import Arrow from "./assets/arrow.svg"
import { ComponentPropsWithoutRef } from "react"

export function SwiperNavigationPrev(
  props: ComponentPropsWithoutRef<"button">
) {
  return <SwiperNavigation action="prev" {...props} />
}

export function SwiperNavigationNext(
  props: ComponentPropsWithoutRef<"button">
) {
  return <SwiperNavigation action="next" {...props} />
}

interface TemplateProps extends ComponentPropsWithoutRef<"button"> {
  action: "prev" | "next"
}

function SwiperNavigation({ action, className, ...rest }: TemplateProps) {
  return (
    <button
      className={classNames(
        className,
        styles.button,
        action === "prev" ? styles.prev : styles.next
      )}
      {...rest}
    >
      <Arrow className={styles.arrow} />
    </button>
  )
}
