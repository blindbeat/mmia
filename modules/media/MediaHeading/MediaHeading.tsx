import { Heading } from "components"
import styles from "./MediaHeading.module.css"

interface Props {
  title: string
  description: string
}
export const MediaHeading = ({ title, description }: Props) => {
  return (
    <div className={styles.content}>
      <Heading as="h1" className={styles.heading}>
        {title}
      </Heading>
      <p className={styles.paragraph}>{description}</p>
    </div>
  )
}
