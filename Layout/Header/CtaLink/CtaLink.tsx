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
      onMouseEnter={() => setAnimationPlayState("running")}
      onAnimationIteration={() => setAnimationPlayState("paused")}
      {...rest}
    >
      <span>
        drop request
        <CtaLine
          className={classNames(
            styles.line,
            animationPlayState === "paused" ? styles.paused : styles.running
          )}
        />
      </span>
    </Link>
  )
}
export default CtaLink
