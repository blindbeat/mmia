import { ComponentPropsWithoutRef } from "react"
import styles from "./ScreenTitle.module.css"
import classNames from "classnames"

interface Props extends ComponentPropsWithoutRef<"span"> {
  children: string
}

function ScreenTitle({ children, className, ...rest }: Props) {
  return (
    <span {...rest} className={classNames(styles.screenTitle, className)}>
      {children}
    </span>
  )
}

export default ScreenTitle
