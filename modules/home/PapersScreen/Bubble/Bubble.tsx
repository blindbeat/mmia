import styles from "./Bubble.module.css"
import { ComponentPropsWithoutRef } from "react"

interface Props extends ComponentPropsWithoutRef<"div"> {
  index: number
}

function Bubble({ index, children, ...rest }: Props) {
  return (
    <div className={styles.bubbleWrapper} {...rest}>
      <div className={styles.bubble}>
        <span className={styles.bubbleIndex}>{`0${index + 1}.`}</span>
        <span className={styles.bubbleText}>{children}</span>
      </div>
    </div>
  )
}

export default Bubble
