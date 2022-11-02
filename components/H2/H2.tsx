// @ts-nocheck
import { ComponentPropsWithoutRef } from "react"
import { SplitText } from "@cyriacbr/react-split-text"
import styles from "./H2.module.css"
import { useInView } from "react-intersection-observer"
import classNames from "classnames"
import { triggerDistance } from "utils"

interface Props extends ComponentPropsWithoutRef<"h2"> {
  children: string
}

function H2({ children, ...rest }: Props) {
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: `${triggerDistance}px`,
    triggerOnce: true,
  })

  return (
    <h2 {...rest} ref={ref}>
      <SplitText
        LineWrapper={({ lineIndex, children }) => (
          <span className={styles.wrapper}>
            <span
              style={{
                animationDelay: `${lineIndex * 0.2}s`,
              }}
              className={classNames(styles.span, inView && styles.appear)}
            >
              {children}
            </span>
          </span>
        )}
      >
        {children}
      </SplitText>
    </h2>
  )
}

export default H2
