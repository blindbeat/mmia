import { ComponentPropsWithoutRef } from "react"
import styles from "./Bubbles.module.css"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper"
import { swiperStyles } from "components/swiperComponents/SwiperBullets"
import { Bubble } from "components"
import { ArrayEntrySanitized } from "types"

interface Bubble {
  title: string
  text: string
}

interface Props extends ComponentPropsWithoutRef<"div"> {
  bubbles: ArrayEntrySanitized[]
}

const Bubbles = ({ bubbles, className }: Props) => {
  return (
    <div className={className}>
      <div className={styles.bubbles}>
        {bubbles.map(({ title, description, key }, index) => (
          <Bubble key={key} index={index} className={styles.bubble}>
            <h4>{title}</h4>
            <p>{description}</p>
          </Bubble>
        ))}
      </div>
      <Swiper
        className={styles.bubblesSwiper}
        slidesPerView="auto"
        centeredSlides
        modules={[Pagination]}
        pagination={{
          enabled: true,
          horizontalClass: swiperStyles.swiperPaginationHorizontal,
          bulletClass: swiperStyles.bulletClass,
          bulletActiveClass: swiperStyles.bulletActiveClass,
        }}
        loop
      >
        {bubbles.map(({ title, description, key }, index) => (
          <SwiperSlide key={key}>
            <Bubble key={key} index={index} className={styles.bubble}>
              <h4>{title}</h4>
              <p>{description}</p>
            </Bubble>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Bubbles
