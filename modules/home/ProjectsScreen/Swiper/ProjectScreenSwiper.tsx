import { Swiper, SwiperSlide } from "swiper/react"
import styles from "./ProjectScreenSwiper.module.css"
import slideImage from "assets/dummyPics/slide.jpg"
import Image from "next/image"
import { Navigation } from "swiper"
import Arrow from "./assets/arrow.svg"
import classNames from "classnames"
// import "swiper/css/navigation"

const title = "Cardiological Hospital in Bryukhovichi"
const tags = ["interior", "architecture"]
const slides = [1, 2, 3, 4, 5]

function ProjectScreenSwiper() {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        prevEl: `.${styles.prev}`,
        nextEl: `.${styles.next}`,
      }}
      slidesPerView="auto"
      centeredSlides
      loop
      spaceBetween={140}
      className={styles.swiper}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <div className={styles.imageContainer}>
            <Image src={slideImage} alt="" />
          </div>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag}>{`(${tag})`}</span>
            ))}
          </div>
          <span className={styles.description}>{title}</span>
        </SwiperSlide>
      ))}
      <button className={classNames(styles.swiperButton, styles.prev)}>
        <Arrow className={styles.arrow} />
      </button>
      <button className={classNames(styles.swiperButton, styles.next)}>
        <Arrow className={styles.arrow} />
      </button>
    </Swiper>
  )
}

export default ProjectScreenSwiper
