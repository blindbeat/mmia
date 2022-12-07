import Paragraph from "components/Paragraph"
import { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"
import styles from "./ProjectParagraphBlock.module.css"

export default function ProjectParagraphBlock({
  className,
  children,
  ...rest
}: ComponentPropsWithoutRef<"p">) {
  return (
    <Paragraph className={classNames(styles.content, className)} {...rest}>
      {children}
    </Paragraph>
  )
}
