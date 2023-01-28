import styles from "./AboutQuote.module.css"
import { Heading } from "components"

interface Props {
  text: string
  author: string
}
const AboutQuote = ({ text, author }: Props) => {
  return (
    <div className={styles.content}>
      <span className={styles.quoteMark}>&ldquo;</span>
      <Heading as="h3" className={styles.quote}>
        {text}
      </Heading>
      <span className={styles.name}>({author})</span>
    </div>
  )
}
export default AboutQuote
