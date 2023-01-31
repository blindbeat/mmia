import styles from "./BuildingPhoto.module.css"
import { ImageWithParallax } from "components/ImageWithParallax"
import { ImageWithDimensions } from "types"

interface Props {
  image: ImageWithDimensions
}
const BuildingPhoto = ({ image }: Props) => {
  return (
    <ImageWithParallax
      src={image.src}
      width={image.width}
      height={image.height}
      alt=""
      sizes="min(80vw, 1600px)"
      className={styles.content}
    />
  )
}

export default BuildingPhoto
