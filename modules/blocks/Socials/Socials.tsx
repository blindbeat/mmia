import { ComponentPropsWithoutRef, forwardRef } from "react"
import classNames from "classnames"
import styles from "./Socials.module.css"
import { useStaticDataSWR } from "hooks"

const Socials = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<"div">>(
  ({ className, ...rest }, ref) => {
    const data = useStaticDataSWR()

    return (
      <div
        ref={ref}
        className={classNames(styles.wrapper, className)}
        {...rest}
      >
        {data &&
          data.socials.map(({ key, name, link }) => (
            <a key={key} href={link} className={styles.link}>
              {name}
            </a>
          ))}
      </div>
    )
  }
)

Socials.displayName = "Socials"

export default Socials
