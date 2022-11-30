import styles from "./BuildingPreparation.module.css"
import ScreenTitle from "components/ScreenTitle"
import H2 from "components/H2"
import { formIndexString } from "misc/utils"
import { dummyParagraphLong } from "assets/dummyText"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const heading = "What documents are required for capital repairs?"

interface Step {
  heading: string
  text: string
}
const step: Step = {
  heading: "Preliminary design of the stadium",
  text: "The method of major overhaul is more than renewal of the resource with a partial replacement for the necessary structural elements, including load-bearing and fenced structures of objects, as well as systems of engineering possession, improvement of their operational indicators",
}

const steps: Step[] = new Array(5).fill(step)

const BuildingPreparation = () => {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <ScreenTitle className={styles.title}>preparation</ScreenTitle>
        <H2 className={styles.heading}>{heading}</H2>
      </div>
      <div className={styles.stepContainer}>
        {steps.map(({ heading, text }, index) => (
          <Step key={index} heading={heading} index={index} />
        ))}
      </div>
    </div>
  )
}

export default BuildingPreparation

interface StepProps {
  index: number
  heading: string
}

const Step = ({ index, heading }: StepProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const [topOffset, setTopOffset] = useState(0)
  const [track, setTrack] = useState(0)
  const layerOffset = 100 * index + 100
  const val = useTransform(
    scrollY,
    [topOffset - layerOffset, topOffset + track - layerOffset],
    [0, track]
  )

  useEffect(() => {
    const elem = ref.current
    const parent = elem?.parentElement
    if (!elem || !parent) return
    setTopOffset(elem.offsetTop)
    console.log(elem.offsetTop)
    console.log(`parent`, parent.offsetTop + parent.offsetHeight)
    setTrack(
      parent.offsetTop +
        parent.offsetHeight -
        elem.offsetTop -
        elem.offsetHeight
    )
  }, [])

  return (
    <motion.div
      className={styles.step}
      style={{
        y: val,
        zIndex: index,
      }}
      ref={ref}
      transition={{
        duration: 0,
      }}
    >
      <span className={styles.index}>{formIndexString(index)}</span>
      <h5>{heading}</h5>
      <p>{dummyParagraphLong}</p>
      <p>{dummyParagraphLong}</p>
      <p>{dummyParagraphLong}</p>
    </motion.div>
  )
}
