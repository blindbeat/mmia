import styles from "./HomeLanding.module.css"
import utilStyles from "styles/utils.module.css"
import Image from "next/image"
import image1 from "assets/dummyPics/home/homeLanding/1.jpg"
import image2 from "assets/dummyPics/home/homeLanding/2.jpg"
import image3 from "assets/dummyPics/home/homeLanding/3.jpg"
import image4 from "assets/dummyPics/home/homeLanding/4.jpg"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Controller, EffectFade, Pagination } from "swiper"
import classNames from "classnames"
import {
  Heading,
  LanguageChangeButton,
  LinkWithLine,
  Paragraph,
} from "components"
import Socials from "modules/blocks/Socials"
import Link from "next/link"
import { useState } from "react"
import "swiper/css/effect-fade"
import { Swiper as SwiperClass } from "swiper/types"

const slides = new Array(4).fill({
  primaryText: "we create impressive architecture and modern interiors",
  secondaryText:
    "Perfect architecture and stunning nature. Country cottage town in the Kyiv region is on an area of about 60 hectares",
})

const images = [image1, image2, image3, image4]
const baseDelay = 0.3
const delayBetweenAppears = 0.4
const calcAnimationDelay = (showingOrder: number) =>
  baseDelay + showingOrder * delayBetweenAppears
const createAnimationDelayStyle = (showingOrder: number) => ({
  animationDelay: `${calcAnimationDelay(showingOrder)}s`,
})

const HomeLanding = () => {
  const [imageSwiper, setImageSwiper] = useState<SwiperClass | null>(null)
  return (
    <div className={classNames(utilStyles.wrapper, styles.wrapper)}>
      <div
        style={createAnimationDelayStyle(1)}
        className={classNames(
          styles.allProjectsLinkWrapper,
          utilStyles.textAppear
        )}
      >
        <Link href="/projects" className={styles.allProjectsLink}>
          all projects
        </Link>
      </div>
      {imageSwiper && (
        <Swiper
          autoplay
          modules={[Pagination, Autoplay, Controller]}
          controller={{ control: imageSwiper }}
          pagination={{
            el: `.${styles.swiperPaginationWrapper}`,
            clickable: true,
            horizontalClass: styles.swiperPagination,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
            renderBullet: (index, className) => {
              return `<span class=${className}>0${index + 1}</span>`
            },
          }}
          loop
          slidesPerView={1}
          centerInsufficientSlides
          speed={1000}
          className={styles.swiper}
        >
          {slides.map(({ primaryText, secondaryText }, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <div className={styles.slideContent}>
                <Heading
                  as="h2"
                  appearImmediately
                  delay={calcAnimationDelay(1)}
                >
                  {primaryText}
                </Heading>
                <div className={styles.pWrapper}>
                  <Paragraph appearImmediately delay={calcAnimationDelay(2)}>
                    {secondaryText}
                  </Paragraph>
                </div>
                <div
                  style={createAnimationDelayStyle(3)}
                  className={utilStyles.textAppear}
                >
                  <LinkWithLine className={classNames(styles.linkWithLine)}>
                    view more
                  </LinkWithLine>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div
        style={createAnimationDelayStyle(3)}
        className={classNames(
          styles.languageChangeWrapper,
          utilStyles.textAppear
        )}
      >
        <LanguageChangeButton className={styles.languageChange} />
      </div>
      <div
        style={createAnimationDelayStyle(3)}
        className={classNames(
          styles.swiperPaginationWrapper,
          utilStyles.textAppear
        )}
      />
      <Socials
        style={createAnimationDelayStyle(3)}
        className={classNames(styles.socials, utilStyles.textAppear)}
      />
      <Swiper
        className={styles.controlledSwiper}
        onSwiper={setImageSwiper}
        loop
        slidesPerView={1}
        effect="fade"
        modules={[EffectFade]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              className={utilStyles.backgroundImage}
              src={image}
              fill
              priority={index === 0}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeLanding