import styles from "./AboutCompanyScreen.module.css"
import LinkWithLine from "components/LinkWithLine"
import Image from "next/image"
import photo from "assets/dummyPics/photo.jpg"
import backdropPhoto from "assets/dummyPics/backdropPhoto.jpg"
import { useInView } from "react-intersection-observer"
import classNames from "classnames"
import baseStyles from "modules/home/Home.module.css"
import ScreenTitle from "components/ScreenTitle"

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
        <ScreenTitle className={styles.screenTitle}>about company</ScreenTitle>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.text}>
          {text.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
          <LinkWithLine color="black" className={styles.link}>
            view more
          </LinkWithLine>
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
