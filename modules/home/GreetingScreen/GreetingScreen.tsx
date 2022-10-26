import styles from "./GreetingScreen.module.css"
import Image from "next/image"
import backgroundImage from "./assets/background.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import classNames from "classnames"
import Link from "components/Link"
import Socials from "./Socials"

const slides = new Array(4).fill({
  primaryText: "we create impressive architecture and modern interiors",
  secondaryText:
    "Perfect architecture and stunning nature. Country cottage town in the Kyiv region is on an area of about 60 hectares",
})

function GreetingScreen() {
  return (
    <div className={styles.wrapper}>
      <a className={styles.allProjectsLink}>all projects</a>
      <a className={styles.languageChange}>en</a>
      <div className={styles.swiperWrapper}>
        <Swiper
          modules={[Pagination]}
          pagination={{
            el: `.${styles.swiperPaginationWrapper}`,
            clickable: true,
            horizontalClass: styles.swiperPagination,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
            renderBullet: (index, className) => {
              return `<span class=${className}>${index + 1}</span>`
            },
          }}
          slidesPerView={1.25}
          spaceBetween={100}
          loop={true}
          speed={1000}
          className={styles.swiper}
        >
          {slides.map(({ primaryText, secondaryText }, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              {({ isActive }) => (
                <>
                  <span
                    className={classNames(
                      styles.slideTextPrimary,
                      isActive && styles.slideTextPrimaryActive
                    )}
                  >
                    {primaryText}
                  </span>
                  <span
                    className={classNames(
                      styles.slideTextSecondary,
                      isActive && styles.slideTextSecondaryActive
                    )}
                  >
                    {secondaryText}
                  </span>
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <Link wrapperClassName={styles.linkWrapper} />
      </div>
      <div className={styles.swiperPaginationWrapper} />
      <Socials className={styles.socials} />
      <Image
        className={styles.background}
        src={backgroundImage}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt=""
      />
    </div>
  )
}

export default GreetingScreen
