import { Media } from "misc/types"
import Image from "next/image"
import styles from "./MediaCards.module.css"
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { useControlMediaGrid } from "hooks"
import { HorizontalSvgLine, VerticalSvgLine } from "components"
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"

interface Props {
  mediaArr: Media[]
}

const calcColumnNumber = () => {
  const minCardWidth = 400
  const minColumns = 1
  const maxColumns = 5
  const result = Math.floor(window.innerWidth / minCardWidth)
  if (result < minColumns) return minColumns
  if (result > maxColumns) return maxColumns
  return result
}

export const MediaCards = ({ mediaArr }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lastVisibleCard, setLastVisibleCard] = useState(0)
  const [columnNumber, setColumnNumber] = useState<null | number>(null)
  const { columnsParams, rowsArray, containerStyle } = useControlMediaGrid(
    mediaArr.length,
    lastVisibleCard,
    columnNumber
  )

  const columnNumberSetter = useCallback(() => {
    setColumnNumber(calcColumnNumber())
  }, [])

  useEffect(() => {
    columnNumberSetter()
    window.addEventListener("resize", columnNumberSetter)
    return () => {
      window.removeEventListener("resize", columnNumberSetter)
    }
  }, [columnNumberSetter])

  const handleInViewChange = (inView: boolean, index: number) => {
    if (inView && lastVisibleCard < index) setLastVisibleCard(index)
  }

  return (
    <div ref={containerRef} style={containerStyle} className={styles.content}>
      {columnsParams.map(([column, columnHeight, lineProgress], index) => (
        <VerticalSvgLine
          lineProgress={lineProgress}
          key={column}
          column={column}
          rowsAmount={columnHeight}
          delay={index * 0.2}
        />
      ))}
      {rowsArray.map((row, index) => (
        <HorizontalSvgLine
          delay={(Math.cbrt(index + 1) - 1) / 2}
          key={row}
          row={row}
        />
      ))}
      {mediaArr.map((media, index) => (
        <Card
          media={media}
          key={index}
          handleInViewChange={(inView) => handleInViewChange(inView, index)}
        />
      ))}
    </div>
  )
}

interface CardProps {
  media: Media
  handleInViewChange: (inView: boolean) => void
}

const springOptions = {
  stiffness: 75,
  mass: 0.02,
}
const Card = ({ media, handleInViewChange }: CardProps) => {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.3,
  })

  const x = useSpring(0, springOptions)
  const y = useSpring(0, springOptions)
  const xVelocity = useVelocity(x)
  const xTransformed = useTransform(x, (latest) => `calc(${latest}px - 50%)`)
  const yTransformed = useTransform(y, (latest) => `calc(${latest}px - 50%)`)
  const rotate = useTransform(xVelocity, [-100, 0, 100], [1, 0, -1], {
    clamp: false,
  })

  useEffect(() => {
    handleInViewChange(inView)
  }, [handleInViewChange, inView])

  const handleMouseMove = (event: MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  return (
    <motion.a
      href=""
      onMouseMove={handleMouseMove}
      animate="hidden"
      whileHover="visible"
      ref={ref}
      className={styles.card}
    >
      <Image src={media.logo} alt="" className={styles.logo} />
      <motion.div
        initial={{
          opacity: 0,
          clipPath: `inset(80% 20% 20% 20%)`,
        }}
        variants={{
          visible: {
            opacity: 1,
            clipPath: `inset(0% 0% 0% 0%)`,
            transition: {
              duration: 0.3,
            },
          },
          hidden: {
            opacity: 0,
            clipPath: `inset(80% 20% 20% 20%)`,
            transition: {
              duration: 0.15,
            },
          },
        }}
        style={{
          x: xTransformed,
          y: yTransformed,
          rotate,
        }}
        transition={{
          scaleY: {
            type: "tween",
          },
        }}
        className={styles.hoverImageContainer}
      >
        <Image src={media.hoverImage} alt="" className={styles.hoverImage} />
      </motion.div>
    </motion.a>
  )
}
