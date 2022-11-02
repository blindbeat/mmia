import baseStyles from "../Home.module.css"
import styles from "./GreetingScreen.module.css"
import Image from "next/image"
import image1 from "assets/dummyPics/greetiongPhotos/1.jpg"
import image2 from "assets/dummyPics/greetiongPhotos/2.jpg"
import image3 from "assets/dummyPics/greetiongPhotos/3.jpg"
import image4 from "assets/dummyPics/greetiongPhotos/4.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Controller, EffectFade, Pagination } from "swiper"
import classNames from "classnames"
import LinkWithLine from "components/LinkWithLine"
import Socials from "./Socials"
import Link from "next/link"
import P from "components/P"
import H2 from "components/H2"
import { useState } from "react"
import "swiper/css/effect-fade"
import { Swiper as SwiperClass } from "swiper/types"

const slides = new Array(4).fill({
  primaryText: "we create impressive architecture and modern interiors",
  secondaryText:
    "Perfect architecture and stunning nature. Country cottage town in the Kyiv region is on an area of about 60 hectares",
})

const images = [image1, image2, image3, image4]

function GreetingScreen() {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(
    null
  )
  return (
    <div className={classNames(baseStyles.wrapper, styles.wrapper)}>
      <Link href="#" className={styles.allProjectsLink}>
        all projects
      </Link>
      <div className={styles.swiperWrapper}>
        {controlledSwiper && (
          <Swiper
            // autoplay
            modules={[Pagination, Autoplay, Controller]}
            controller={{ control: controlledSwiper }}
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
            spaceBetween={100}
            loop
            speed={1000}
            className={styles.swiper}
          >
            {slides.map(({ primaryText, secondaryText }, index) => (
              <SwiperSlide className={styles.slide} key={index}>
                <H2 appearImmediate>{primaryText}</H2>
                <P
                  appearImmediately
                  className={classNames(styles.slideTextSecondary)}
                >
                  {secondaryText}
                </P>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <LinkWithLine wrapperClassName={styles.link}>view more</LinkWithLine>
      </div>
      <Link href="#" className={styles.languageChange}>
        en
      </Link>
      <div className={styles.swiperPaginationWrapper} />
      <Socials className={styles.socials} />
      <Swiper
        className={styles.controlledSwiper}
        onSwiper={setControlledSwiper}
        // slidesPerView={2}
        loop
        effect="fade"
        modules={[EffectFade]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              className={baseStyles.backgroundImage}
              src={image}
              fill
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default GreetingScreen
