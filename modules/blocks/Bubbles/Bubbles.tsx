import { ComponentPropsWithoutRef } from "react"
import styles from "./Bubbles.module.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import { swiperStyles } from "components/swiperComponents/SwiperBullets"
import { Bubble } from "components"

interface Bubble {
  title: string
  text: string
}

interface Props extends ComponentPropsWithoutRef<"div"> {
  bubbles: Bubble[]
}

const Bubbles = ({ bubbles, className }: Props) => {
  return (
    <div className={className}>
      <div className={styles.bubbles}>
        {bubbles.map(({ title, text }, index) => (
          <Bubble key={index} index={index} className={styles.bubble}>
            <h4>{title}</h4>
            <p>{text}</p>
          </Bubble>
        ))}
      </div>
      <Swiper
        className={styles.bubblesSwiper}
        slidesPerView={1.5}
        centeredSlides
        modules={[Pagination]}
        pagination={{
          enabled: true,
          horizontalClass: swiperStyles.swiperPaginationHorizontal,
          bulletClass: swiperStyles.bulletClass,
          bulletActiveClass: swiperStyles.bulletActiveClass,
        }}
        breakpoints={{
          768: {
            slidesPerView: 3.5,
          },
          1024: {
            pagination: {
              enabled: false,
            },
          },
        }}
      >
        {bubbles.map(({ title, text }, index) => (
          <SwiperSlide key={index}>
            <Bubble key={index} index={index} className={styles.bubble}>
              <h4>{title}</h4>
              <p>{text}</p>
            </Bubble>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Bubbles
