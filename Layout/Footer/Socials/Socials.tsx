import styles from "./Socials.module.css"
import utilStyles from "styles/utils.module.css"
import Image from "next/image"
import backgroundImage from "assets/dummyPics/greetiongPhotos/4.jpg"
import SocialsSwiper from "./Swiper"
import Link from "next/link"
import classNames from "classnames"

const heading = "Subscribe to our social networks"
const paragraph =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist"

const socialLinks = ["ig", "be", "fb", "yt"]

export default function Socials() {
  return (
    <div className={classNames(utilStyles.wrapper, styles.content)}>
      <h2>{heading}</h2>
      <SocialsSwiper className={styles.swiper} />
      <p>{paragraph}</p>
      <Image
        src={backgroundImage}
        alt=""
        fill
        className={classNames(
          utilStyles.backgroundImage,
          styles.backgroundImage
        )}
      />
      <div className={styles.socialLinks}>
        {socialLinks.map((link) => (
          <Link key={link} href="#">
            <span>{link}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
