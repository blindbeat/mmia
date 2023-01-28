import styles from "./AboutPhoto.module.css"
import { ImageWithParallax } from "components/ImageWithParallax"
import { ImageWithDimensions } from "types"

interface Props {
  image: ImageWithDimensions
}
const AboutPhoto = ({ image }: Props) => {
  return (
    <ImageWithParallax
      src={image.src}
      width={image.width}
      height={image.height}
      alt=""
      sizes="200vw"
      className={styles.content}
    />
  )
}

export default AboutPhoto
