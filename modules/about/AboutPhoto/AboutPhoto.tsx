import styles from "./AboutPhoto.module.css"
import photo from "assets/dummyPics/home/homeLanding/3.jpg"
import { ImageWithParallax } from "components/ImageWithParallax"

const AboutPhoto = () => {
  return (
    <ImageWithParallax
      src={photo}
      alt=""
      sizes="200vw"
      className={styles.content}
    />
  )
}

export default AboutPhoto
