import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper"
import styles from "./Gallery.module.css"
import { swiperStyles } from "components/swiperComponents/SwiperBullets"
import Image from "next/image"
import {
  SwiperNavigationNext,
  SwiperNavigationPrev,
} from "components/swiperComponents"
import classNames from "classnames"
import { ImageWithDimensions } from "types/miscTypes"
import { ComponentPropsWithoutRef } from "react"
import { useProjectGallery } from "contexts/ProjectGalleryContext"

interface Props extends ComponentPropsWithoutRef<"div"> {
  images: ImageWithDimensions | ImageWithDimensions[]
  triggerGalleryOpen?: boolean
}

const imageSizes = `
                   (max-width: calc(48em - 1px)) 100vw,
                   (max-width: calc(64em - 1px)) 60vw,
                   50vw,
                   `

export const Gallery = ({
  images,
  className,
  triggerGalleryOpen = false,
}: Props) => {
  const { selectImage } = useProjectGallery()

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
          {images.map((image, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <Image
                src={image.src}
                alt=""
                width={image.width}
                height={image.height}
                onClick={
                  triggerGalleryOpen ? () => selectImage(image.src) : undefined
                }
                sizes={imageSizes}
                className={styles.image}
              />
            </SwiperSlide>
          ))}
          <SwiperNavigationNext className={classNames(styles.next)} />
          <SwiperNavigationPrev className={classNames(styles.prev)} />
        </Swiper>
      ) : (
        <Image
          src={Array.isArray(images) ? images[0].src : images.src}
          width={Array.isArray(images) ? images[0].width : images.width}
          height={Array.isArray(images) ? images[0].height : images.height}
          alt=""
          className={styles.standaloneImage}
        />
      )}
    </div>
  )
}
