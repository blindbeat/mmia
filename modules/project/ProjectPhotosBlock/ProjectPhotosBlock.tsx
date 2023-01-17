import styles from "./ProjectPhotosBlock.module.css"
import Image from "next/image"
import { ImageWithDimensions } from "misc/types"
import classNames from "classnames"

type PhotoOrientation = "vertical" | "horizontal"

interface Props {
  photos: ImageWithDimensions[]
  photoOrientation: PhotoOrientation
}

export default function ProjectPhotosBlock({
  photos,
  photoOrientation,
}: Props) {
  const sizes =
    photoOrientation === "vertical"
      ? `(max-width: 1024px) 100vw,
         50vw,
         `
      : `100vw
        `

  return (
    <div
      className={classNames(
        styles.content,
        photoOrientation === "vertical" ? styles.vertical : styles.horizontal
      )}
    >
      {photos.map((image, index) => (
        <div key={index} className={styles.imageWrapper}>
          <Image
            className={styles.image}
            src={image.src}
            width={image.width}
            height={image.height}
            alt=""
            sizes={sizes}
          />
        </div>
      ))}
    </div>
  )
}
