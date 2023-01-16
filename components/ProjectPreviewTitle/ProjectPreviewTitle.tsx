import { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"

export const ProjectPreviewTitle = ({
  children,
  className,
}: ComponentPropsWithoutRef<"div">) => {
  return <div className={classNames("h6", className)}>{children}</div>
}
