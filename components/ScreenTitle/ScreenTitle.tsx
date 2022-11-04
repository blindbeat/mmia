import { ComponentPropsWithoutRef } from "react"
import styles from "./ScreenTitle.module.css"
import classNames from "classnames"

function ScreenTitle({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"span">) {
  return (
    <div {...rest} className={classNames(styles.screenTitle, className)}>
      <div className={styles.square}></div>
      {children}
    </div>
  )
}

export default ScreenTitle
