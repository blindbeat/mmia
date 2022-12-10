import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react"
import styles from "components/LinkWithLine/LinkWithLine.module.css"
import classNames from "classnames"
import Link from "next/link"

interface Props extends ComponentPropsWithoutRef<"a"> {
  color?: string
  children?: ReactNode
}

export const LinkWithLine = ({
  color = "white",
  className,
  children,
  ...rest
}: Props) => {
  const [hovered, setHovered] = useState(false)

  const pathRef = useRef<SVGPathElement | null>(null)
  const pathLengthRef = useRef<number | null>(null)

  useEffect(() => {
    if (!pathRef.current) return
    pathLengthRef.current = pathRef.current?.getTotalLength()
  }, [])

  return (
    <Link
      href="#"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={classNames(styles.content, className)}
      {...rest}
    >
      <span
        className={classNames(styles.text)}
        style={{
          color,
        }}
      >
        {children}
      </span>
      <svg
        viewBox="0 0 201 77"
        fill="none"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.line}
        strokeDasharray={pathLengthRef.current ?? undefined}
      >
        <path
          ref={pathRef}
          opacity="0.2"
          d="M6.19264 70.0978C152.191 97.9301 268.191 17.484 134.693 2.098C94.1922 -2.56976 8.1908 6.93032 1.1909 44.4303C-6.17696 83.9015 202.191 70.0978 199.694 31.4303C197.077 -9.06986 57.6914 -5.56985 6.19264 38.4301"
          stroke={color}
          style={{
            strokeDashoffset:
              hovered && pathLengthRef.current !== null
                ? `${pathLengthRef.current * 2}px`
                : undefined,
          }}
        />
      </svg>
    </Link>
  )
}
