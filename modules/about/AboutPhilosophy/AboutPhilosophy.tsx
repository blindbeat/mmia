import styles from "./AboutPhilosophy.module.css"
import ScreenTitle from "components/ScreenTitle"
import { dummyPhilosophy } from "assets/dummyText"

const AboutPhilosophy = () => {
  return (
    <div className={styles.content}>
      <ScreenTitle>our philosophy</ScreenTitle>
      <p>{dummyPhilosophy}</p>
    </div>
  )
}

export default AboutPhilosophy
