import styles from "./BuildingPreparation.module.css"
import { Heading, ScreenTitle } from "components"
import { formIndexString } from "misc/utils"
import { useCalcElementHeight } from "hooks"
import { ArrayEntrySanitized } from "types"

export const generatePreparationIndex = (index?: number) =>
  index === undefined ? `building-preparation` : `building-preparation-${index}`

interface Props {
  heading: string
  blocks: ArrayEntrySanitized[]
}
const BuildingPreparation = ({ heading, blocks }: Props) => {
  const { ref, height } = useCalcElementHeight()

  return (
    <div className={styles.content}>
      <div
        ref={ref}
        style={{}}
        id={generatePreparationIndex()}
        className={styles.text}
      >
        <ScreenTitle className={styles.title}>preparation</ScreenTitle>
        <Heading as="h3" className={styles.heading}>
          {heading}
        </Heading>
      </div>
      {blocks.map((step, index) => (
        <Step key={index} index={index} step={step} offset={height / 4} />
      ))}
    </div>
  )
}

export default BuildingPreparation

interface StepProps {
  index: number
  step: ArrayEntrySanitized
  offset: number
}

const Step = ({ index, step, offset }: StepProps) => {
  const { ref, height } = useCalcElementHeight()

  return (
    <div
      id={generatePreparationIndex(index + 1)}
      className={styles.step}
      style={{
        top: `calc(${offset + index * height}px + var(--headerHeight)`,
      }}
    >
      <span className={styles.index}>{formIndexString(index)}</span>
      <h5 ref={ref}>{step.title}</h5>
      <div
        className={styles.stepText}
        dangerouslySetInnerHTML={{ __html: step.description }}
      ></div>
    </div>
  )
}
