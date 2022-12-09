import Link, { LinkProps } from "next/link"
import styles from "modules/blocks/Navigation/CtaLink/CtaLink.module.css"
import classNames from "classnames"
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from "react"

function CtaLink({
  className,
  ...rest
}: ComponentPropsWithoutRef<"a"> & LinkProps) {
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false)

  const pathRef = useRef<SVGPathElement | null>(null)
  const [lineLength, setLineLength] = useState(0)
  const [iteration, setIteration] = useState(0)

  useEffect(() => {
    const path = pathRef.current
    if (!path) return
    setLineLength(path.getTotalLength())
  }, [])

  return (
    <Link
      className={classNames(styles.content, className)}
      onMouseEnter={() => {
        if (isAnimationPlaying) return
        setIteration(iteration + 1)
        setIsAnimationPlaying(true)
      }}
      onTransitionEnd={() => setIsAnimationPlaying(false)}
      {...rest}
    >
      <span>
        drop request
        <svg
          viewBox="0 0 136 4"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          <path
            style={{
              strokeDasharray: lineLength,
              strokeDashoffset: iteration * lineLength * -2,
            }}
            className={styles.path}
            ref={pathRef}
            opacity="0.2"
            d="M1 1C38.7206 5.49999 87.0294 1.00001 136 1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
    </Link>
  )
}
export default CtaLink
