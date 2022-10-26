import styles from "./AboutCompany.module.css"
import Link from "components/Link"
import Image from "next/image"
import photo from "./assets/photo.jpg"
import backdropPhoto from "./assets/backdropPhoto.jpg"

const title =
  "We improve the world around us and create an impressive architecture using innovative solutions and We "

const text = [
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular",
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular ",
]

function AboutCompany() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h2 className={styles.header}>
          <div className={styles.rectangle} />
          <span>about company</span>
        </h2>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.text}>
          {text.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          <Link lineColor="black" className={styles.link} />
        </div>
        <div className={styles.imageWrapper}>
          <Image src={photo} alt="" />
          <div className={styles.backdropPhoto}>
            {/*<Image src={backdropPhoto} alt="" fill={true} />*/}
          </div>
        </div>
        <span className={styles.founderTitle}>( Company founder )</span>
      </div>
    </div>
  )
}

export default AboutCompany
