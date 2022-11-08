import styles from "./ProjectPreviewTitle.module.css"
import { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"

interface Props extends ComponentPropsWithoutRef<"div"> {
  title: string
}

export default function ProjectPreviewTitle({ title, className }: Props) {
  return <div className={classNames(styles.title, className)}>{title}</div>
}
