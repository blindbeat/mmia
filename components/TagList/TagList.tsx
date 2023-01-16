import { ComponentPropsWithoutRef } from "react"
import styles from "./TagList.module.css"
import classNames from "classnames"
import { Tag } from "misc/types"

interface Props extends ComponentPropsWithoutRef<"div"> {
  tags: Tag[]
}

export const TagList = ({ tags, className }: Props) => {
  return (
    <div className={classNames(styles.tags, className)}>
      {tags.map((tag) => (
        <span key={tag.id}>{`(${tag.name})`}</span>
      ))}
    </div>
  )
}
