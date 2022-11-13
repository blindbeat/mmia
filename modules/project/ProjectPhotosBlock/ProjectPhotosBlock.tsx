import styles from "./ProjectPhotosBlock.module.css"
import Image from "next/image"
import { NextImageSrc } from "misc/types"

interface Props {
  photos: NextImageSrc[]
}

export default function ProjectPhotosBlock({ photos }: Props) {
  return (
    <div className={styles.content}>
      {photos.map((src, index) => (
        <Image key={index} className={styles.image} src={src} alt="" />
      ))}
    </div>
  )
}
