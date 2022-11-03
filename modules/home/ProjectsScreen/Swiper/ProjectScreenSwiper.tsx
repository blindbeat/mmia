import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import styles from "./ProjectScreenSwiper.module.css"
import slide1 from "assets/dummyPics/ourProjects/1.jpg"
import slide2 from "assets/dummyPics/ourProjects/2.jpg"
import slide3 from "assets/dummyPics/ourProjects/3.jpg"
import Image from "next/image"
import { Navigation } from "swiper"
import Arrow from "./assets/arrow.svg"
import classNames from "classnames"
// import "swiper/css/navigation"

const title = "Cardiological Hospital in Bryukhovichi"
const tags = ["interior", "architecture"]
const slides = [slide1, slide2, slide3]

function ProjectScreenSwiper({ className, ...rest }: SwiperProps) {
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
      className={classNames(styles.swiper, className)}
      {...rest}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <div className={styles.imageContainer}>
            <Image src={slide} alt="" />
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
