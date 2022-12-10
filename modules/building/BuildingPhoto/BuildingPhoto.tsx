import photo from "assets/dummyPics/building/buildingPhoto/parallax.png"
import styles from "./BuildingPhoto.module.css"
import { ImageWithParallax } from "components/ImageWithParallax"

const BuildingPhoto = () => {
  return <ImageWithParallax src={photo} alt="" className={styles.content} />
}

export default BuildingPhoto
