import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import styles from "./ProjectScreenSwiper.module.css"
import slide1 from "assets/dummyPics/ourProjects/1.jpg"
import slide2 from "assets/dummyPics/ourProjects/2.jpg"
import slide3 from "assets/dummyPics/ourProjects/3.jpg"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper"
import classNames from "classnames"
import TagList from "components/TagList/TagList"
import ProjectPreviewTitle from "components/ProjectPreviewTitle/ProjectPreviewTitle"
import { tags, title } from "assets/dummyText"
import {
  SwiperNavigationNext,
  SwiperNavigationPrev,
} from "components/SwiperComponents"
import { swiperStyles } from "components/SwiperComponents/SwiperBullets"
import ImageZoomableContainer from "components/ImageZoomableContainer"

const slides = [slide1, slide2, slide3]

const imageSizes = `
                   (max-width: calc(48em - 1px)) 100vw,
                   (max-width: calc(64em - 1px)) 60vw,
                   50vw,
  `

function ProjectScreenSwiper({ className, ...rest }: SwiperProps) {
  return (
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
      slidesPerView="auto"
      centeredSlides
      loop
      pagination={{
        enabled: true,
        horizontalClass: swiperStyles.swiperPaginationHorizontal,
        bulletClass: swiperStyles.bulletClass,
        bulletActiveClass: swiperStyles.bulletActiveClass,
      }}
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
      className={classNames(styles.swiper, className)}
      {...rest}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <ImageZoomableContainer className={styles.imageContainer}>
            <Image src={slide} alt="" sizes={imageSizes} />
          </ImageZoomableContainer>
          {/*<div className={styles.imageContainer}>*/}
          {/*</div>*/}
          <TagList tags={tags} className={styles.tags} />
          <ProjectPreviewTitle title={title} className={styles.title} />
        </SwiperSlide>
      ))}
      <SwiperNavigationNext
        className={classNames(styles.swiperButton, styles.next)}
      />
      <SwiperNavigationPrev
        className={classNames(styles.swiperButton, styles.prev)}
      />
    </Swiper>
  )
}

export default ProjectScreenSwiper
