import { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"

interface Props extends ComponentPropsWithoutRef<"div"> {
  title: string
}

export const ProjectPreviewTitle = ({ title, className }: Props) => {
  return <div className={classNames("h6", className)}>{title}</div>
}
