import styles from "./ProjectPhotosBlock.module.css"
import Image from "next/image"
import { NextImageSrc } from "misc/types"
import classNames from "classnames"

type PhotoOrientation = "vertical" | "horizontal"

interface Props {
  photos: NextImageSrc[]
  photoOrientation: PhotoOrientation
}

export default function ProjectPhotosBlock({
  photos,
  photoOrientation,
}: Props) {
  // photos = [photos[0]]
  return (
    <div
      className={classNames(
        styles.content,
        photoOrientation === "vertical" ? styles.vertical : styles.horizontal
      )}
    >
      {photos.map((src, index) => (
        <div key={index} className={styles.imageWrapper}>
          <Image className={styles.image} src={src} alt="" />
        </div>
      ))}
    </div>
  )
}
