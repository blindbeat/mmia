import styles from "./GreetingScreen.module.css"
import Image from "next/image"
import backgroundImage from "assets/home/background.jpg"

function GreetingScreen() {
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.background}
        src={backgroundImage}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt=""
      />
      Hello
    </div>
  )
}

export default GreetingScreen
