import styles from "./BuildingBenefits.module.css"
import ScreenTitle from "components/ScreenTitle"
import H2 from "components/H2"
import P from "components/P"
import Bubble from "components/Bubble"
import { Swiper, SwiperSlide } from "swiper/react"

const title = "we are the best guarantee of quality for our customers"
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
        <H2 className={styles.heading}>{title}</H2>
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
      <Swiper className={styles.bubblesSwiper} slidesPerView={3}>
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
