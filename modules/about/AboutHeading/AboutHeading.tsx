import { Heading } from "components"
import styles from "./AboutHeading.module.css"

const heading =
  "We are thoroughly familiar with the world, creating architecture that is hostile"

const AboutHeading = () => {
  return (
    <div className={styles.wrapper}>
      <Heading as="h1" className={styles.content}>
        {heading}
      </Heading>
    </div>
  )
}

export default AboutHeading
