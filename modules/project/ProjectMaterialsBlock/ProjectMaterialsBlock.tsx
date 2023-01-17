import styles from "./ProjectMaterialsBlock.module.css"
import { Heading, Paragraph } from "components"
import { dummyParagraph } from "assets/dummyText"
import Image from "next/image"
import { ImageWithDimensions } from "misc/types"

interface description {
  heading: string
  description: string
  image: ImageWithDimensions
}

interface Props {
  heading: string
  materials: description[]
}

const sizes = `(max-width: 1024px) 50vw,
               25vw,
              `

export default function ProjectMaterialsBlock({ materials, heading }: Props) {
  return (
    <div className={styles.content}>
      <Heading as="h3" className={styles.header}>
        {heading}
      </Heading>
      <div className={styles.images}>
        {materials.map(({ image: src }, index) => (
          <div key={index} className={styles.imageWrapper}>
            <span className={styles.imageIndex}>{`0${index + 1}.`}</span>
            <Image
              src={src}
              alt=""
              sizes={sizes}
              fill
              className={styles.image}
            />
          </div>
        ))}
      </div>
      <div className={styles.descriptions}>
        {materials.map(({ heading, description }, index) => (
          <div key={index}>
            <div className={styles.descriptionTitle}>{heading}</div>
            <Paragraph className={styles.descriptionParagraph}>
              {description}
            </Paragraph>
          </div>
        ))}
      </div>
      <Paragraph className={styles.paragraph}>{dummyParagraph}</Paragraph>
    </div>
  )
}
