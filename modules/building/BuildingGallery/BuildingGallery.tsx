import { Gallery } from "components"
import styles from "./BuildingGallery.module.css"
import { ImageWithDimensions } from "types"

interface Props {
  images: ImageWithDimensions[]
}
const BuildingGallery = ({ images }: Props) => {
  return <Gallery images={images} className={styles.content} />
}

export default BuildingGallery
