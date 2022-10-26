import { ComponentPropsWithoutRef } from "react"
import classNames from "classnames"
import styles from "modules/home/GreetingScreen/Socials/Socials.module.css"
const links = ["ig", "be", "fb", "yt"]

function Socials({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={classNames(className, styles.wrapper)} {...rest}>
      {links.map((link) => (
        <a key={link} className={styles.link}>
          {link}
        </a>
      ))}
    </div>
  )
}

export default Socials
