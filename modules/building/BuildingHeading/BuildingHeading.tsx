import styles from "./BuildingHeading.module.css"
import { Heading } from "components"

interface Props {
  title: string
}
const BuildingHeading = ({ title }: Props) => {
  return (
    <Heading as="h1" className={styles.content}>
      {title}
    </Heading>
  )
}
export default BuildingHeading
