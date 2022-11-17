import { Swiper, SwiperProps, SwiperSlide } from "swiper/react"
import { ComponentPropsWithoutRef, useState } from "react"
import classNames from "classnames"
import image1 from "assets/dummyPics/project/imagesSwiper/1.jpg"
import image2 from "assets/dummyPics/project/imagesSwiper/2.png"
import image3 from "assets/dummyPics/project/imagesSwiper/3.jpg"
import Image from "next/image"
import styles from "./ImagesSwiper.module.css"
import { Autoplay, Controller, EffectCreative } from "swiper"
import { Swiper as SwiperClass } from "swiper/types"
import { NextImageSrc } from "misc/types"

export default function ImagesSwiper({
  className,
}: ComponentPropsWithoutRef<"div">) {
  const [controlledSwiper1, setControlledSwiper1] = useState<
    SwiperClass | undefined
  >(undefined)
  const [controlledSwiper2, setControlledSwiper2] = useState<
    SwiperClass | undefined
  >(undefined)

  const images = [image1, image2, image3]
  const imagesShiftedBack = [
    images.at(-1),
    ...images.slice(0, -1),
  ] as NextImageSrc[]
  const imagesShiftedForward = [...images.slice(1), images[0]]

  return (
    <div className={classNames(styles.wrapper, className)}>
      {controlledSwiper2 && (
        <SwiperEntity
          images={imagesShiftedBack}
          modules={[Controller]}
          onSwiper={setControlledSwiper1}
          allowTouchMove={false}
          controller={{
            control: controlledSwiper2,
          }}
        />
      )}
      {controlledSwiper1 && (
        <SwiperEntity
          images={images}
          modules={[Controller, Autoplay]}
          autoplay
          allowTouchMove={false}
          controller={{
            control: controlledSwiper1,
          }}
        />
      )}

      <SwiperEntity
        images={imagesShiftedForward}
        modules={[Controller]}
        onSwiper={setControlledSwiper2}
        allowTouchMove={false}
      />
    </div>
  )
}

interface SwiperEntityProps extends SwiperProps {
  images: NextImageSrc[]
}

const SwiperEntity = ({ images, modules = [], ...rest }: SwiperEntityProps) => (
  <Swiper
    loop
    effect="creative"
    speed={2000}
    modules={[EffectCreative, ...modules]}
    creativeEffect={{
      prev: {
        scale: 1.5,
        translate: ["-125%", 0, 0],
      },
      next: {
        scale: 1.5,
        translate: ["125%", 0, 0],
      },
    }}
    className={styles.swiper}
    {...rest}
  >
    {images.map((src, index) => (
      <SwiperSlide key={index} className={styles.slide}>
        <Image src={src} alt="" className={styles.image} />
      </SwiperSlide>
    ))}
  </Swiper>
)
