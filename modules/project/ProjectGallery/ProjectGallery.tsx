import { Swiper, SwiperSlide } from "swiper/react"
import { ImageWithDimensions } from "types"
import styles from "./ProjectGallery.module.css"
import { createPortal } from "react-dom"
import Image from "next/image"
import { Navigation } from "swiper"
import { SwiperNavigationNext, SwiperNavigationPrev } from "components"
import classNames from "classnames"
import Cross from "assets/images/cross.svg"
import { useProjectGallery } from "contexts/ProjectGalleryContext"
import { motion } from "framer-motion"

interface Props {
  images: ImageWithDimensions[]
  initialImageSrc: string
}
export default function ProjectGallery({ images, initialImageSrc }: Props) {
  const { closeGallery } = useProjectGallery()
  const portal = document.getElementById(`__next`)
  if (portal === null) throw new Error("portal not found")

  const initialImageIndex = images.findIndex(
    ({ src }) => initialImageSrc === src
  )

  return createPortal(
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.1,
      }}
      className={styles.wrapper}
    >
      <Swiper
        modules={[Navigation]}
        initialSlide={initialImageIndex}
        navigation={{
          prevEl: `.${styles.prev}`,
          nextEl: `.${styles.next}`,
        }}
        className={styles.swiper}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            <Image src={image} fill alt="" className={styles.image} />
          </SwiperSlide>
        ))}
        <SwiperNavigationNext className={classNames(styles.next)} />
        <SwiperNavigationPrev className={classNames(styles.prev)} />
        <button onClick={closeGallery} className={styles.crossButton}>
          <Cross />
        </button>
      </Swiper>
    </motion.div>,
    portal
  )
}
