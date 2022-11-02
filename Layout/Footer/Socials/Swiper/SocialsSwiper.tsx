import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import Image from "next/image"
import image from "assets/dummyPics/instagramPhoto.png"
import styles from "./SocialsSwiper.module.css"
import { Autoplay } from "swiper"
import { useRef, useState } from "react"
import classNames from "classnames"

const slides = new Array(10).fill(10)

function SocialsSwiper({ className, ...props }: SwiperProps) {
  const ref = useRef<null | any>(null)

  const [swiper, setSwiper] = useState<any>(null)

  return (
    <Swiper
      modules={[Autoplay]}
      centeredSlides
      slidesPerView="auto"
      className={classNames(styles.swiper, className)}
      loop
      speed={10000}
      onSwiper={(swiper) => setSwiper(swiper)}
      autoplay={{ delay: 1 }}
      onClick={() => swiper.slideNext()}
      {...props}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <Image src={image} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SocialsSwiper
