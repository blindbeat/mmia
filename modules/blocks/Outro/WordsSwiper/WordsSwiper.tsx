import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper"
import styles from "./WordsSwiper.module.css"
import classNames from "classnames"
import { Fragment } from "react"

const WordsSwiper = () => {
  return (
    <Swiper
      slidesPerGroup={4}
      modules={[Autoplay]}
      slidesPerView="auto"
      loop
      allowTouchMove={false}
      speed={25000}
      autoplay={{
        delay: 1,
        disableOnInteraction: false,
      }}
      className={styles.swiper}
    >
      {[...new Array(5)].map((_, index) => (
        <Fragment key={index}>
          <SwiperSlide
            key={`${index}-1`}
            className={classNames(styles.slide, "h3")}
          >
            Let&apos;s discuss yours!
          </SwiperSlide>
          <SwiperSlide
            key={`${index}-2`}
            className={classNames(styles.slide, "h3")}
          >
            -
          </SwiperSlide>
          <SwiperSlide
            key={`${index}-3`}
            className={classNames(styles.slide, "h3", styles.ctaText)}
          >
            Click on the button!
          </SwiperSlide>
          <SwiperSlide
            key={`${index}-4`}
            className={classNames(styles.slide, "h3")}
          >
            -
          </SwiperSlide>
        </Fragment>
      ))}
    </Swiper>
  )
}

export default WordsSwiper
