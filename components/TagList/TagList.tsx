import { ComponentPropsWithoutRef } from "react"
import styles from "./TagList.module.css"
import classNames from "classnames"

interface Props extends ComponentPropsWithoutRef<"div"> {
  tags: string[]
}

export default function TagList({ tags, className }: Props) {
  return (
    <div className={classNames(styles.tags, className)}>
      {tags.map((tag) => (
        <span key={tag}>{`(${tag})`}</span>
      ))}
    </div>
  )
}
