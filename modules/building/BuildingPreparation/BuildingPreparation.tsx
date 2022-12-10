import styles from "./BuildingPreparation.module.css"
import { Heading, ScreenTitle } from "components"
import { formIndexString } from "misc/utils"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { useAnimateLayering, useThresholdObserver } from "hooks"

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
const textOffset = 75
const BuildingPreparation = () => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const y = useAnimateLayering(ref, textOffset)

  const extendsThreshold = useThresholdObserver(768)

  useEffect(() => {
    const elem = ref.current
    if (!elem) return
    setHeaderHeight(
      elem.offsetHeight -
        (parseFloat(getComputedStyle(elem).paddingBottom) / 3) * 2
    )
  }, [])

  return (
    <div className={styles.content}>
      <motion.div
        ref={ref}
        style={{
          y: extendsThreshold ? y : undefined,
          zIndex: 0,
        }}
        className={styles.text}
      >
        <ScreenTitle className={styles.title}>preparation</ScreenTitle>
        <Heading as="h3" className={styles.heading}>
          {heading}
        </Heading>
      </motion.div>
      {steps.map((step, index) => (
        <Step
          key={index}
          step={step}
          index={index}
          offset={60 * index + headerHeight + textOffset}
        />
      ))}
    </div>
  )
}

export default BuildingPreparation

interface StepProps {
  index: number
  step: Step
  offset: number
}

const Step = ({ index, step, offset }: StepProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const y = useAnimateLayering(ref, offset)
  const extendsThreshold = useThresholdObserver(768)

  return (
    <motion.div
      className={styles.step}
      style={{
        y: extendsThreshold ? y : undefined,
        zIndex: index,
      }}
      ref={ref}
    >
      <span className={styles.index}>{formIndexString(index)}</span>
      <h5>{step.heading}</h5>
      <div className={styles.stepText}>
        <p>{step.text}</p>
        <p>{step.text}</p>
        <p>{step.text}</p>
      </div>
    </motion.div>
  )
}
