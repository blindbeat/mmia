import styles from "./ProjectMaterialsBlock.module.css"
import Heading from "components/Heading"
import { dummyParagraph } from "assets/dummyText"
import P from "components/P"
import Image from "next/image"
import { NextImageSrc } from "misc/types"

const header = "materials used in project"
interface description {
  title: string
  paragraph: string
  image: NextImageSrc
}

interface Props {
  materials: description[]
}

export default function ProjectMaterialsBlock({ materials }: Props) {
  return (
    <div className={styles.content}>
      <Heading as="h3" className={styles.header}>
        {header}
      </Heading>
      <div className={styles.images}>
        {materials.map(({ image: src }, index) => (
          <div key={index} className={styles.imageWrapper}>
            <span className={styles.imageIndex}>{`0${index + 1}.`}</span>
            <Image src={src} alt="" className={styles.image} />
          </div>
        ))}
      </div>
      <div className={styles.descriptions}>
        {materials.map(({ title, paragraph }, index) => (
          <div key={index}>
            <div className={styles.descriptionTitle}>{title}</div>
            <P className={styles.descriptionParagraph}>{paragraph}</P>
          </div>
        ))}
      </div>
      <P className={styles.paragraph}>{dummyParagraph}</P>
    </div>
  )
}
