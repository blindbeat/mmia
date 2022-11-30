import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper"
import styles from "./Gallery.module.css"
import { swiperStyles } from "components/SwiperComponents/SwiperBullets"
import Image from "next/image"
import {
  SwiperNavigationNext,
  SwiperNavigationPrev,
} from "components/SwiperComponents"
import classNames from "classnames"
import { NextImageSrc } from "misc/types"
import { ComponentPropsWithoutRef } from "react"

interface Props extends ComponentPropsWithoutRef<"div"> {
  images: NextImageSrc[] | NextImageSrc
}

const Gallery = ({ images, className }: Props) => {
  return (
    <div className={className}>
      {Array.isArray(images) && images.length > 1 ? (
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
          {images.map((src, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <Image src={src} className={styles.image} alt="" />
            </SwiperSlide>
          ))}
          <SwiperNavigationNext className={classNames(styles.next)} />
          <SwiperNavigationPrev className={classNames(styles.prev)} />
        </Swiper>
      ) : (
        <Image
          src={Array.isArray(images) ? images[0] : images}
          alt=""
          className={styles.standaloneImage}
        />
      )}
    </div>
  )
}
export default Gallery
