import { ComponentPropsWithoutRef, forwardRef } from "react"
import classNames from "classnames"
import styles from "./Socials.module.css"

const links = ["ig", "be", "fb", "yt"]

const Socials = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(styles.wrapper, className)}
        {...rest}
      >
        {links.map((link) => (
          <a key={link} className={styles.link}>
            {link}
          </a>
        ))}
      </div>
    )
  }
)

Socials.displayName = "Socials"

export default Socials
