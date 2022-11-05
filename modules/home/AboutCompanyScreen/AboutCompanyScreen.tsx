import styles from "./AboutCompanyScreen.module.css"
import LinkWithLine from "components/LinkWithLine"
import Image from "next/image"
import founderPhoto from "assets/dummyPics/founderPhoto.jpg"
import backdropPhoto from "assets/dummyPics/backdropPhoto.jpg"
import BackgroundSvg from "./assets/backgroundLines.svg"
import { useInView } from "react-intersection-observer"
import classNames from "classnames"
import baseStyles from "modules/home/Home.module.css"
import ScreenTitle from "components/ScreenTitle"
import P from "components/P"
import useAnimateLine from "hooks/useAnimateLine"

const title = "about company"
const heading =
  "We improve the world around us and create an impressive architecture using innovative solutions and We"
const paragraph = new Array(2).fill(
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular"
)

function AboutCompanyScreen() {
  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  })

  const { ref: bgRef, style: bgStyle } = useAnimateLine()

  return (
    <div className={classNames(baseStyles.wrapper, styles.wrapper)}>
      <div className={styles.content}>
        <ScreenTitle className={styles.screenTitle}>{title}</ScreenTitle>
        <h2 className={styles.title}>{heading}</h2>
        <div ref={ref} className={styles.text}>
          {paragraph.map((text, index) => (
            <P key={index}>{text}</P>
          ))}
          <LinkWithLine color="black" wrapperClassName={styles.link}>
            view more
          </LinkWithLine>
        </div>
        <div className={styles.imageWrapper}>
          <Image src={founderPhoto} alt="" className={styles.founderPhoto} />
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
      <BackgroundSvg
        ref={bgRef}
        style={bgStyle}
        className={styles.backgroundSvg}
      />
    </div>
  )
}

export default AboutCompanyScreen
