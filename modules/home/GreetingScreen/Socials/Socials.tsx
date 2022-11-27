import { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"
import styles from "./Socials.module.css"

const links = ["ig", "be", "fb", "yt"]

function Socials({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={classNames(styles.wrapper, className)} {...rest}>
      {links.map((link) => (
        <a key={link} className={styles.link}>
          {link}
        </a>
      ))}
    </div>
  )
}

export default Socials
