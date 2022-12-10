import styles from "./ProjectMaterialsBlock.module.css"
import { Heading, Paragraph } from "components"
import { dummyParagraph } from "assets/dummyText"
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
            <Paragraph className={styles.descriptionParagraph}>
              {paragraph}
            </Paragraph>
          </div>
        ))}
      </div>
      <Paragraph className={styles.paragraph}>{dummyParagraph}</Paragraph>
    </div>
  )
}
