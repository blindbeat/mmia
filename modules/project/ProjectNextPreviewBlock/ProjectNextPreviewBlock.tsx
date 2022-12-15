import Image from "next/image"
import NextProjectImage from "assets/dummyPics/project/projectBlock/3.jpg"
import styles from "./ProjectNextPreviewBlock.module.css"
import { Heading, ScreenTitle } from "components"
import { title } from "assets/dummyText"
import classNames from "classnames"
import { PhotoWithEyes } from "modules/blocks/PhotoWithEyes"

export default function ProjectNextPreviewBlock() {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <ScreenTitle>about company</ScreenTitle>
        <Heading as="h2" className={styles.title}>
          {title}
        </Heading>
      </div>
      <PhotoWithEyes image={NextProjectImage} ctaText="*click to go*" />
      <Image
        src={NextProjectImage}
        alt=""
        sizes="100vw"
        className={classNames(styles.image, styles.imageBackground)}
      />
    </div>
  )
}
