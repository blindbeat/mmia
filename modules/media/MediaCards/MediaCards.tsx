import { Media } from "misc/types"
import Image from "next/image"
import styles from "./MediaCards.module.css"
import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { useControMediaGrid } from "hooks/useControMediaGrid"
import { HorizontalSvgLine, VerticalSvgLine } from "components/svgLines"
import {
  motion,
  useInView,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion"
import { SpringOptions } from "popmotion"

interface Props {
  mediaArr: Media[]
}

const calcColumnNumber = () => Math.min(Math.floor(window.innerWidth / 400), 5)

export const MediaCards = ({ mediaArr }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lastVisibleCard, setLastVisibleCard] = useState(0)
  const [columnNumber, setColumnNumber] = useState(3)
  const { columnsParams, rowsArray, containerStyle } = useControMediaGrid(
    mediaArr.length,
    lastVisibleCard,
    columnNumber
  )

  const columnNumberSetter = useCallback(() => {
    setColumnNumber(calcColumnNumber())
  }, [])

  console.log(containerStyle)

  useEffect(() => {
    columnNumberSetter()
    window.addEventListener("resize", columnNumberSetter)
    return () => {
      window.removeEventListener("resize", columnNumberSetter)
    }
  }, [])

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
const Card = ({ media, handleInViewChange }: CardProps) => {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.3,
  })

  const springOptions: SpringOptions = {
    stiffness: 75,
    mass: 0.02,
  }

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
  }, [inView])

  const handleMouseMove = (event: MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    x.set(event.clientX - rect.left)
    y.set(event.clientY - rect.top)
  }

  // useEffect(() => {
  //   return () => {
  //     effect
  //   }
  // }, [input])

  return (
    <motion.div
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
    </motion.div>
  )
}
