import styles from "./BuildingBenefits.module.css"
import ScreenTitle from "components/ScreenTitle"
import Heading from "components/Heading"
import P from "components/P"
import Bubble from "components/Bubble"
import { Swiper, SwiperSlide } from "swiper/react"
import { swiperStyles } from "components/SwiperComponents/SwiperBullets"
import { Pagination } from "swiper"

const heading = "we are the best guarantee of quality for our customers"
const paragraph =
  "Your work will be intensive, but the tasks will be interesting. You will independently build the process of your work and will be able to directly influence the result."

const bubbleHeading = "Climate"
const bubbleText =
  "Your work will be intensive, but the tasks will be interesting. You will independently "

interface BubbleContent {
  heading: string
  text: string
}

const bubbles: BubbleContent[] = [...new Array(4)].fill({
  heading: bubbleHeading,
  text: bubbleText,
})

const BuildingBenefits = () => {
  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <ScreenTitle className={styles.title}>our benefits</ScreenTitle>
        <Heading as="h3" className={styles.heading}>
          {heading}
        </Heading>
        <P className={styles.paragraph}>{paragraph}</P>
      </div>
      <div className={styles.bubbles}>
        {bubbles.map(({ heading, text }, index) => (
          <Bubble key={index} index={index} className={styles.bubble}>
            <h4>{heading}</h4>
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
        {bubbles.map(({ heading, text }, index) => (
          <SwiperSlide key={index}>
            <Bubble key={index} index={index} className={styles.bubble}>
              <h4>{heading}</h4>
              <p>{text}</p>
            </Bubble>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
export default BuildingBenefits
