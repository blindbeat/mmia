import Image from "next/image"
import styles from "./ProjectNextPreviewBlock.module.css"
import { Heading, ScreenTitle } from "components"
import { title } from "assets/dummyText"
import classNames from "classnames"
import { PhotoWithEyes } from "modules/blocks/PhotoWithEyes"
import { NextImageSrc } from "misc/types"

interface Props {
  image: NextImageSrc
}
export default function ProjectNextPreviewBlock({ image }: Props) {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <ScreenTitle>about company</ScreenTitle>
        <Heading as="h2" className={styles.title}>
          {title}
        </Heading>
      </div>
      <PhotoWithEyes image={image} ctaText="*click to go*" />
      <Image
        src={image}
        alt=""
        fill
        sizes="100vw"
        className={classNames(styles.image, styles.imageBackground)}
      />
    </div>
  )
}
