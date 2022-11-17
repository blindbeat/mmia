import ScreenTitle from "components/ScreenTitle"
import styles from "./ProjectSchemasBlock.module.css"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"
import { NextImageSrc } from "misc/types"
import {
  SwiperNavigationNext,
  SwiperNavigationPrev,
} from "components/SwiperComponents"
import classNames from "classnames"
import { Autoplay, Navigation, Pagination } from "swiper"
import BackgroundSvg from "modules/home/AboutCompanyScreen/assets/backgroundLine.svg"
import useAnimateLine from "hooks/useAnimateLine"
import { swiperStyles } from "components/SwiperComponents/SwiperBullets/SwiperBullets"
import { dummyParagraph } from "assets/dummyText"

interface Props {
  schemas: NextImageSrc[]
}

export default function ProjectSchemasBlock({ schemas }: Props) {
  const { ref, style } = useAnimateLine()
  return (
    <div className={styles.content}>
      <ScreenTitle className={styles.blockTitle}>project drawing</ScreenTitle>
      <div className={styles.photoWrapper}>
        {schemas.length > 1 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{
              pauseOnMouseEnter: true,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: `.${styles.prev}`,
              nextEl: `.${styles.next}`,
            }}
            pagination={{
              enabled: true,
              horizontalClass: swiperStyles.swiperPaginationHorizontal,
              bulletClass: swiperStyles.bulletClass,
              bulletActiveClass: swiperStyles.bulletActiveClass,
            }}
            slidesPerView="auto"
            centeredSlides
            breakpoints={{
              1920: {
                spaceBetween: 138,
              },
              1440: {
                spaceBetween: 118,
              },
              1024: {
                spaceBetween: 78,
              },
              768: {
                pagination: {
                  enabled: false,
                },
                spaceBetween: 58,
              },
            }}
            loop
            className={styles.swiper}
          >
            {schemas.map((src, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <Image src={src} className={styles.image} alt="" />
              </SwiperSlide>
            ))}
            <SwiperNavigationNext className={classNames(styles.next)} />
            <SwiperNavigationPrev className={classNames(styles.prev)} />
          </Swiper>
        ) : (
          <Image src={schemas[0]} alt="" className={styles.standaloneImage} />
        )}
      </div>
      <div className={styles.paragraphWrapper}>
        <p className={styles.paragraph}>{dummyParagraph}</p>
      </div>
      <BackgroundSvg ref={ref} style={style} className={styles.backgroundSvg} />
    </div>
  )
}
