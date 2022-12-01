import styles from "./BuildingBenefits.module.css"
import ScreenTitle from "components/ScreenTitle"
import Heading from "components/Heading"
import P from "components/P"
import Bubbles from "modules/blocks/Bubbles "
import { bubbles } from "assets/dummyText"

const heading = "we are the best guarantee of quality for our customers"
const paragraph =
  "Your work will be intensive, but the tasks will be interesting. You will independently build the process of your work and will be able to directly influence the result."

const BuildingBenefits = () => {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <ScreenTitle className={styles.title}>our benefits</ScreenTitle>
        <Heading as="h3" className={styles.heading}>
          {heading}
        </Heading>
        <P className={styles.paragraph}>{paragraph}</P>
      </div>
      <Bubbles bubbles={bubbles} />
    </div>
  )
}
export default BuildingBenefits
