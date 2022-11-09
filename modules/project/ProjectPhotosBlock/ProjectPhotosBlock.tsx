import styles from "./ProjectPhotosBlock.module.css"
import Image, { ImageProps } from "next/image"

interface Props {
  photos: Pick<ImageProps, "src">[]
}

export default function ProjectPhotosBlock({ photos }: Props) {
  return (
    <div className={styles.content}>
      {photos.map((src, index) => (
        <Image
          key={index}
          className={styles.image}
          src={src as unknown as any}
          alt=""
        />
      ))}
    </div>
  )
}
