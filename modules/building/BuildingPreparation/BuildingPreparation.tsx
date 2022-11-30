import styles from "./BuildingPreparation.module.css"
import ScreenTitle from "components/ScreenTitle"
import H2 from "components/H2"
import { formIndexString } from "misc/utils"
import { dummyParagraphLong } from "assets/dummyText"
import { motion } from "framer-motion"

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
      <div>
        {steps.map(({ heading, text }, index) => (
          <div key={index}>
            <motion.div
              className={styles.step}
              animate={{
                // y: !index ? 330 : undefined,
                zIndex: index,
              }}
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuildingPreparation
