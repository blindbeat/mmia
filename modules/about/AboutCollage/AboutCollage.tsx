import styles from "./AboutCollage.module.css"
import { dummyParagraph } from "assets/dummyText"
import P from "components/P"
import Image from "next/image"
import founderPhoto from "assets/dummyPics/founderPhoto.jpg"
import officeImage from "assets/dummyPics/backdropPhoto.jpg"

const AboutCollage = () => {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <P>{dummyParagraph}</P>
        <P>{dummyParagraph}</P>
      </div>
      <Image src={founderPhoto} alt="" className={styles.founderImage} />
      <div className={styles.office}>
        <span className={styles.officeTitle}>our office in Kyiv</span>
        <Image src={officeImage} alt="" className={styles.officeImage} />
      </div>
    </div>
  )
}

export default AboutCollage
