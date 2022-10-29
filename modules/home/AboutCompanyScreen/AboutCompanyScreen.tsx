import styles from "modules/home/AboutCompanyScreen/AboutCompanyScreen.module.css"
import Link from "components/Link"
import Image from "next/image"
import photo from "./assets/photo.jpg"
import backdropPhoto from "./assets/backdropPhoto.jpg"
import { useInView } from "react-intersection-observer"
import classNames from "classnames"
import baseStyles from "modules/home/Home.module.css"

const title =
  "We improve the world around us and create an impressive architecture using innovative solutions and We "

const text = [
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular",
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular ",
]

function AboutCompanyScreen() {
  const { ref, inView } = useInView({
    threshold: 1,
    rootMargin: "-25px",
    triggerOnce: true,
  })

  return (
    <div className={classNames(baseStyles.wrapper, styles.wrapper)}>
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
        <div ref={ref} className={styles.imageWrapper}>
          <Image src={photo} alt="" className={styles.founderPhoto} />
          <Image
            className={classNames(
              styles.backdropPhoto,
              !inView && styles.hiding
            )}
            src={backdropPhoto}
            alt=""
          />
        </div>
        <span className={styles.founderTitle}>( Company founder )</span>
      </div>
    </div>
  )
}

export default AboutCompanyScreen
