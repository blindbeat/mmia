import P from "components/P"
import { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"
import styles from "./ProjectParagraphBlock.module.css"

export default function ProjectParagraphBlock({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"p">) {
  return (
    <P className={classNames(styles.content, className)} {...rest}>
      {children}
    </P>
  )
}
