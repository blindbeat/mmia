import styles from "./HomeLanding.module.css"
import utilStyles from "styles/utils.module.css"
import Image from "next/image"

import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Controller, EffectFade, Pagination } from "swiper"
import classNames from "classnames"
import {
  ComponentWithLineAdornment,
  Heading,
  LanguageChangeButton,
  Paragraph,
} from "components"
import Socials from "modules/blocks/Socials"
import Link from "next/link"
import { useState } from "react"
import "swiper/css/effect-fade"
import { Swiper as SwiperClass } from "swiper/types"
import { HomeLandingContent } from "types"
import { useTranslation } from "next-i18next"

const baseDelay = 0.3
const delayBetweenAppears = 0.4
const calcAnimationDelay = (showingOrder: number) =>
  baseDelay + showingOrder * delayBetweenAppears
const createAnimationDelayStyle = (showingOrder: number) => ({
  animationDelay: `${calcAnimationDelay(showingOrder)}s`,
})
const HomeLanding = ({ projects }: HomeLandingContent) => {
  const { t } = useTranslation(["home", "common"])

  const [imageSwiper, setImageSwiper] = useState<SwiperClass | null>(null)

  return (
    <div className={classNames(utilStyles.wrapper, styles.wrapper)}>
      <div
        style={createAnimationDelayStyle(1)}
        className={classNames(
          styles.allProjectsLinkWrapper,
          utilStyles.textAppear
        )}
      >
        <Link href="/projects" className={styles.allProjectsLink}>
          {t("landing.all projects")}
        </Link>
      </div>
      {imageSwiper && (
        <Swiper
          autoplay
          modules={[Pagination, Autoplay, Controller]}
          controller={{ control: imageSwiper }}
          pagination={{
            el: `.${styles.swiperPaginationWrapper}`,
            clickable: true,
            horizontalClass: styles.swiperPagination,
            bulletClass: styles.bullet,
            bulletActiveClass: styles.bulletActive,
            renderBullet: (index, className) => {
              return `<span class=${className}>0${index + 1}</span>`
            },
          }}
          loop
          slidesPerView={1}
          centerInsufficientSlides
          speed={1000}
          className={styles.swiper}
        >
          {projects.map(({ heading, description, slug }, index) => (
            <SwiperSlide className={styles.slide} key={index}>
              <div className={styles.slideContent}>
                <Heading
                  as="h2"
                  appearImmediately
                  delay={calcAnimationDelay(1)}
                >
                  {heading}
                </Heading>
                <div className={styles.pWrapper}>
                  <Paragraph appearImmediately delay={calcAnimationDelay(2)}>
                    {description}
                  </Paragraph>
                </div>
                <div
                  style={createAnimationDelayStyle(3)}
                  className={utilStyles.textAppear}
                >
                  <ComponentWithLineAdornment
                    as="Link"
                    href={`projects/${slug}`}
                    className={classNames(styles.linkWithLine)}
                  >
                    {t("view more", { ns: "common" })}
                  </ComponentWithLineAdornment>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div
        style={createAnimationDelayStyle(3)}
        className={classNames(
          styles.languageChangeWrapper,
          utilStyles.textAppear
        )}
      >
        <LanguageChangeButton className={styles.languageChange} />
      </div>
      <div
        style={createAnimationDelayStyle(3)}
        className={classNames(
          styles.swiperPaginationWrapper,
          utilStyles.textAppear
        )}
      />
      <Socials
        style={createAnimationDelayStyle(3)}
        className={classNames(styles.socials, utilStyles.textAppear)}
      />
      <Swiper
        className={styles.controlledSwiper}
        onSwiper={setImageSwiper}
        loop
        slidesPerView={1}
        effect="fade"
        modules={[EffectFade]}
      >
        {projects.map(({ image }, index) => (
          <SwiperSlide key={index}>
            <Image
              className={utilStyles.backgroundImage}
              src={image}
              fill
              priority={index === 0}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default HomeLanding
