import { Media } from "misc/types"
import Image from "next/image"
import styles from "./MediaCards.module.css"
import { useEffect, useRef, useState } from "react"
import { useControMediaGrid } from "hooks/useControMediaGrid"
import { HorizontalSvgLine, VerticalSvgLine } from "components/svgLines"
import { useInView } from "framer-motion"

interface Props {
  mediaArr: Media[]
}

export const MediaCards = ({ mediaArr }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [lastVisibleCard, setLastVisibleCard] = useState(0)
  const { columnsParams, rowsArray, containerStyle } = useControMediaGrid(
    mediaArr.length,
    lastVisibleCard,
    3
  )

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

  useEffect(() => {
    handleInViewChange(inView)
  }, [inView])
  return (
    <div ref={ref} className={styles.card}>
      <Image src={media.logo} alt="" className={styles.image} />
    </div>
  )
}
