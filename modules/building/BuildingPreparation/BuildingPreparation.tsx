import styles from "./BuildingPreparation.module.css"
import ScreenTitle from "components/ScreenTitle"
import { formIndexString } from "misc/utils"
import { dummyParagraphLong } from "assets/dummyText"
import { motion } from "framer-motion"
import { useRef } from "react"
import useAnimateLayering from "hooks/useAnimateLayering"
import Heading from "components/Heading"

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
        <Heading as="h3" className={styles.heading}>
          {heading}
        </Heading>
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
  const y = useAnimateLayering(ref, 100 * index + 100)
  return (
    <motion.div
      className={styles.step}
      style={{
        y,
        zIndex: index,
      }}
      ref={ref}
    >
      <span className={styles.index}>{formIndexString(index)}</span>
      <h5>{heading}</h5>
      <p>{dummyParagraphLong}</p>
      <p>{dummyParagraphLong}</p>
      <p>{dummyParagraphLong}</p>
    </motion.div>
  )
}
