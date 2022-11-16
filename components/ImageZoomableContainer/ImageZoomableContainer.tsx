import { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"
import styles from "./ImageZoomableContainer.module.css"

export default function ImageZoomableContainer({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={classNames(styles.imageContainer, className)} {...rest}>
      {children}
    </div>
  )
}
