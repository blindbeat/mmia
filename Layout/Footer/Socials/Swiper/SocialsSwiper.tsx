import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import Image from "next/image"
import image1 from "assets/dummyPics/instagramPhotos/1.jpg"
import image2 from "assets/dummyPics/instagramPhotos/2.jpg"
import image3 from "assets/dummyPics/instagramPhotos/3.jpg"
import image4 from "assets/dummyPics/instagramPhotos/4.jpg"
import styles from "./SocialsSwiper.module.css"
import { Autoplay, FreeMode } from "swiper"
import classNames from "classnames"
import Tilt from "react-parallax-tilt"

const images = [image1, image2, image3, image4]

function SocialsSwiper({ className, ...props }: SwiperProps) {
  return (
    <Swiper
      modules={[Autoplay, FreeMode]}
      centeredSlides
      slidesPerView="auto"
      className={classNames(styles.swiper, className)}
      loop
      spaceBetween={64}
      speed={10000}
      breakpoints={{
        1920: {
          spaceBetween: 64,
        },
        1440: {
          spaceBetween: 48,
        },
        1024: {
          spaceBetween: 40,
        },
      }}
      autoplay={{
        delay: 1,
        disableOnInteraction: true,
      }}
      {...props}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <Tilt transitionSpeed={1000}>
            <Image src={image} alt="" />
          </Tilt>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SocialsSwiper
