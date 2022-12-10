import styles from "./BuildingHeading.module.css"
import { Heading } from "components"

const title = "The method of major overhaul"

const BuildingHeading = () => {
  return (
    <Heading as="h1" className={styles.content}>
      {title}
    </Heading>
  )
}
export default BuildingHeading
