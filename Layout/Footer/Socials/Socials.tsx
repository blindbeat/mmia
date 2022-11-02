import styles from "./Socials.module.css"
import Image from "next/image"
import backgroundImage from "assets/dummyPics/genericBackground.jpg"
import SocialsSwiper from "./Swiper"
import Link from "next/link"

const paragraph =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist"

const socialLinks = ["ig", "be", "fb", "yt"]

function Socials() {
  return (
    <div className={styles.wrapper}>
      <h2>Subscribe to our social networks</h2>
      <SocialsSwiper className={styles.swiper} />
      <p>{paragraph}</p>
      <Image
        src={backgroundImage}
        alt=""
        fill
        className={styles.backgroundImage}
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

export default Socials