import styles from "./BuildingHeading.module.css"
import H2 from "components/H2"

const title = "The method of major overhaul"

const BuildingHeading = () => {
  return <H2 className={styles.content}>{title}</H2>
}
export default BuildingHeading
