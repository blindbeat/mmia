import Bubbles from "modules/blocks/Bubbles "
import { bubbles } from "assets/dummyText"
import styles from "./AboutBubbles.module.css"

const AboutBubbles = () => {
  return <Bubbles bubbles={bubbles} className={styles.content} />
}

export default AboutBubbles
