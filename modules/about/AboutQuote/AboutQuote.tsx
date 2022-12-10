import styles from "./AboutQuote.module.css"
import { Heading } from "components"
import { dummyTitleLong } from "assets/dummyText"

const name = "Vasily Prikhotko"
const AboutQuote = () => {
  return (
    <div className={styles.content}>
      <span className={styles.quoteMark}>&ldquo;</span>
      <Heading as="h3" className={styles.quote}>
        {dummyTitleLong}
      </Heading>
      <span className={styles.name}>({name})</span>
    </div>
  )
}
export default AboutQuote
