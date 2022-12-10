import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"
import styles from "./ScreenTitle.module.css"
import classNames from "classnames"

export const ScreenTitle = ({
  children,
  className,
  ...rest
}: ComponentPropsWithoutRef<"span">) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [squareColor, setSquareColor] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (!ref.current) return
    setSquareColor(getComputedStyle(ref.current).color)
  }, [ref])

  return (
    <div
      {...rest}
      ref={ref}
      className={classNames(styles.screenTitle, className)}
    >
      <div
        style={{ backgroundColor: squareColor }}
        className={styles.square}
      ></div>
      {children}
    </div>
  )
}
