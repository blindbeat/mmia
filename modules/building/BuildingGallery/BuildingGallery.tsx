import Gallery from "components/Gallery"
import image from "assets/dummyPics/building/photo.png"
import styles from "./BuildingGallery.module.css"

const images = new Array(3).fill(image)
const BuildingGallery = () => {
  return <Gallery images={images} className={styles.content} />
}

export default BuildingGallery
