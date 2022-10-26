import { ComponentPropsWithoutRef } from "react"
import styles from "./Link.module.css"
import classNames from "classnames"

interface Props extends ComponentPropsWithoutRef<"a"> {
  wrapperClassName?: string
  lineColor?: string
}

function Link({
  lineColor = "white",
  className,
  wrapperClassName,
  ...rest
}: Props) {
  return (
    <div className={classNames(styles.wrapper, wrapperClassName)}>
      <a className={classNames(styles.link, className)} {...rest}>
        View more
      </a>
      <svg
        viewBox="0 0 201 77"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.line}
      >
        <path
          opacity="0.2"
          d="M6.19264 70.0978C152.191 97.9301 268.191 17.484 134.693 2.098C94.1922 -2.56976 8.1908 6.93032 1.1909 44.4303C-6.17696 83.9015 202.191 70.0978 199.694 31.4303C197.077 -9.06986 57.6914 -5.56985 6.19264 38.4301"
          stroke={lineColor}
        />
      </svg>
    </div>
  )
}

export default Link
