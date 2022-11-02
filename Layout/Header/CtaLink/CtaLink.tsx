import Link, { LinkProps } from "next/link"
import styles from "./CtaLink.module.css"
import CtaLine from "./assets/ctaLine.svg"
import classNames from "classnames"
import { ComponentPropsWithoutRef, useState } from "react"

function CtaLink({
  className,
  ...rest
}: ComponentPropsWithoutRef<"a"> & LinkProps) {
  const [animationPlayState, setAnimationPlayState] =
    useState<AnimationPlayState>("paused")

  return (
    <Link
      className={classNames(styles.content, className)}
      style={{
        animationPlayState,
      }}
      onMouseEnter={() => setAnimationPlayState("running")}
      onAnimationIteration={() => setAnimationPlayState("paused")}
      {...rest}
    >
      drop request
      <CtaLine />
    </Link>
  )
}
export default CtaLink
