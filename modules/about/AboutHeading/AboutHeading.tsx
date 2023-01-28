import { Heading } from "components"
import styles from "./AboutHeading.module.css"

interface Props {
  title: string
}
const AboutHeading = ({ title }: Props) => {
  return (
    <div className={styles.wrapper}>
      <Heading as="h1" className={styles.content}>
        {title}
      </Heading>
    </div>
  )
}

export default AboutHeading
