import photo from "assets/dummyPics/building/buildingPhoto/parallax.jpeg"
import styles from "./BuildingPhoto.module.css"
import { ImageWithParallax } from "components/ImageWithParallax"

const BuildingPhoto = () => {
  return (
    <ImageWithParallax
      src={photo}
      alt=""
      sizes="min(80vw, 1600px)"
      className={styles.content}
    />
  )
}

export default BuildingPhoto
