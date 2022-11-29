import styles from "./BuildingBenefits.module.css"
import ScreenTitle from "components/ScreenTitle"
import H2 from "components/H2"
import P from "components/P"
import Bubble from "modules/home/PapersScreen/Bubble"

const title = "we are the best guarantee of quality for our customers"
const paragraph =
  "Your work will be intensive, but the tasks will be interesting. You will independently build the process of your work and will be able to directly influence the result."

const BuildingBenefits = () => {
  return (
    <div className={styles.content}>
      <ScreenTitle className={styles.title}>our benefits</ScreenTitle>
      <H2 className={styles.heading}>{title}</H2>
      <P className={styles.paragraph}>{paragraph}</P>
      <div className={styles.bubbles}>
        {[...new Array(4)].map((_, index) => (
          <Bubble key={index} index={index} className={styles.bubble} />
        ))}
      </div>
    </div>
  )
}
export default BuildingBenefits
