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
      {photos.map((src, index) => (
        <div key={index} className={styles.imageWrapper}>
          <Image className={styles.image} src={src} alt="" sizes={sizes} />
        </div>
      ))}
    </div>
  )
}
