import styles from "./AboutPhilosophy.module.css"
import { ScreenTitle } from "components"

interface Props {
  text: string
}
const AboutPhilosophy = ({ text }: Props) => {
  return (
    <div className={styles.content}>
      <ScreenTitle>our philosophy</ScreenTitle>
      <p>{text}</p>
    </div>
  )
}

export default AboutPhilosophy
