import styles from "./ProjectMaterialsBlock.module.css"
import H2 from "components/H2"
import { dummyParagraph } from "assets/dummyText"
import P from "components/P"
import Image from "next/image"
import material1 from "assets/dummyPics/ProjectPhotos/materialPhotos/1.jpg"
import material2 from "assets/dummyPics/ProjectPhotos/materialPhotos/2.jpg"
import { NextImageSrc } from "misc/types"

const header = "materials used in project"
interface description {
  title: string
  paragraph: string
  image: NextImageSrc
}

const descriptions: description[] = [
  {
    title: "black marble",
    paragraph: dummyParagraph,
    image: material1,
  },
  {
    title: "polished wood",
    paragraph: dummyParagraph,
    image: material2,
  },
]

export default function ProjectMaterialsBlock() {
  return (
    <div className={styles.content}>
      <H2 className={styles.header}>{header}</H2>
      <div className={styles.images}>
        {descriptions.map(({ image: src }, index) => (
          <div key={index} className={styles.imageWrapper}>
            <span className={styles.imageIndex}>{`0${index + 1}.`}</span>
            <Image src={src} alt="" className={styles.image} />
          </div>
        ))}
      </div>
      <div className={styles.descriptions}>
        {descriptions.map(({ title, paragraph }, index) => (
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
