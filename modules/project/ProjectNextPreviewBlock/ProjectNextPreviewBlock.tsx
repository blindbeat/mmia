import Image from "next/image"
import styles from "./ProjectNextPreviewBlock.module.css"
import { Heading, ScreenTitle } from "components"
import { title } from "assets/dummyText"
import classNames from "classnames"
import { PhotoWithEyes } from "modules/blocks/PhotoWithEyes"
import { NextImageSrc } from "types"
import Link from "next/link"

interface Props {
  image: NextImageSrc
  slug: string
}
export default function ProjectNextPreviewBlock({ image, slug }: Props) {
  return (
    <Link href={`/projects/${slug}`} className={styles.content}>
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
    </Link>
  )
}
