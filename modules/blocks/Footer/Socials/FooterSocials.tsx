import styles from "./FooterSocials.module.css"
import utilStyles from "styles/utils.module.css"
import Image from "next/image"
import backgroundImage from "assets/dummyPics/home/homeLanding/4.jpg"
import SocialsSwiper from "./Swiper"
import classNames from "classnames"
import { useStaticDataSWR } from "hooks"

const FooterSocials = () => {
  const data = useStaticDataSWR()
  return (
    <div className={classNames(utilStyles.wrapper, styles.content)}>
      {data && <h3>{data.title}</h3>}
      <SocialsSwiper className={styles.swiper} />
      {data && <p>{data.description}</p>}
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
        {data &&
          data.socials.map(({ key, name, link }) => (
            <a key={key} href={link}>
              <span>{name}</span>
            </a>
          ))}
      </div>
    </div>
  )
}

export default FooterSocials
