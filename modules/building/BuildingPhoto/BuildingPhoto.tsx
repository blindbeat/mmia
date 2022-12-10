import photo from "assets/dummyPics/building/1.png"
import styles from "./BuildingPhoto.module.css"
import { ImageWithParallax } from "components/ImageWithParallax"

const BuildingPhoto = () => {
  return <ImageWithParallax src={photo} alt="" className={styles.content} />
}

export default BuildingPhoto
