import { Gallery } from "components"
import image from "assets/dummyPics/building/buildingGallery/galleryPhoto.png"
import styles from "./BuildingGallery.module.css"

const images = new Array(3).fill(image)
const BuildingGallery = () => {
  return <Gallery images={images} className={styles.content} />
}

export default BuildingGallery
