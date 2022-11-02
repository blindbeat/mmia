import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import Image from "next/image"
import image1 from "assets/dummyPics/instagramPhotos/1.jpg"
import image2 from "assets/dummyPics/instagramPhotos/2.jpg"
import image3 from "assets/dummyPics/instagramPhotos/3.jpg"
import image4 from "assets/dummyPics/instagramPhotos/4.jpg"
import styles from "./SocialsSwiper.module.css"
import { Autoplay } from "swiper"
import classNames from "classnames"

const images = [image1, image2, image3, image4]

function SocialsSwiper({ className, ...props }: SwiperProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      centeredSlides
      slidesPerView="auto"
      className={classNames(styles.swiper, className)}
      loop
      speed={10000}
      autoplay={{ delay: 1 }}
      {...props}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className={styles.slide}>
          <Image src={image} alt="" />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SocialsSwiper