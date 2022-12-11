import styles from "./BuildingPreparation.module.css"
import { Heading, ScreenTitle } from "components"
import { formIndexString } from "misc/utils"
import { useCalcElementHeight } from "hooks"

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
  const { ref, height } = useCalcElementHeight()

  return (
    <div className={styles.content}>
      <div ref={ref} style={{}} className={styles.text}>
        <ScreenTitle className={styles.title}>preparation</ScreenTitle>
        <Heading as="h3" className={styles.heading}>
          {heading}
        </Heading>
      </div>
      {steps.map((step, index) => (
        <Step key={index} index={index} step={step} offset={height} />
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
  const { ref, height } = useCalcElementHeight()

  return (
    <div
      className={styles.step}
      style={{
        top: `calc(${offset + index * height}px + var(--headerHeight)`,
      }}
    >
      <span className={styles.index}>{formIndexString(index)}</span>
      <h5 ref={ref}>{step.heading}</h5>
      <div className={styles.stepText}>
        <p>{step.text}</p>
        <p>{step.text}</p>
        <p>{step.text}</p>
      </div>
    </div>
  )
}
