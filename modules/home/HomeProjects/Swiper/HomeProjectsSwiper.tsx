import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import styles from "./HomeProjectsSwiper.module.css"
import Image from "next/image"
import { Autoplay, Navigation, Pagination } from "swiper"
import classNames from "classnames"
import {
  SwiperNavigationNext,
  SwiperNavigationPrev,
} from "components/swiperComponents"
import { swiperStyles } from "components/swiperComponents/SwiperBullets"
import {
  ImageZoomableContainer,
  ProjectPreviewTitle,
  TagList,
} from "components"
import { HomeProjectsSwiperContent } from "types"
import Link from "next/link"

const imageSizes = `
                   (max-width: calc(48em - 1px)) 100vw,
                   (max-width: calc(64em - 1px)) 60vw,
                   50vw,
                   `

type Props = SwiperProps & HomeProjectsSwiperContent
function HomeProjectsSwiper({ className, projects, ...rest }: Props) {
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
      {projects.map(({ heading, image, slug, id, categories: tags }) => (
        <SwiperSlide key={id} className={styles.slide}>
          <Link href={`/projects/${slug}`} className={styles.link}>
            <ImageZoomableContainer className={styles.imageContainer}>
              <Image src={image} alt="" fill sizes={imageSizes} />
            </ImageZoomableContainer>
            <TagList tags={tags} className={styles.tags} />
            <ProjectPreviewTitle className={styles.title}>
              {heading}
            </ProjectPreviewTitle>
          </Link>
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

export default HomeProjectsSwiper
