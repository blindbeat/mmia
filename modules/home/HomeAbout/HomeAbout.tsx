import styles from "./HomeAbout.module.css"
import {
  ComponentWithLineAdornment,
  Heading,
  Paragraph,
  ScreenTitle,
} from "components"
import Image from "next/image"
import BackgroundSvg from "./assets/backgroundLine.svg"
import { useInView } from "react-intersection-observer"
import classNames from "classnames"
import utilStyles from "styles/utils.module.css"
import { useAnimateLine } from "hooks"
import { HomeAboutContent } from "types"
import { useTranslation } from "next-i18next"

const HomeAbout = ({ title, image1, image2, text }: HomeAboutContent) => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    delay: 1000,
  })

  const { t } = useTranslation(["home", "common"])

  const { ref: bgRef, style: bgStyle } = useAnimateLine()

  return (
    <div className={classNames(utilStyles.wrapper, styles.wrapper)}>
      <div className={styles.content}>
        <ScreenTitle className={styles.screenTitle}>
          {t("about.title")}
        </ScreenTitle>
        <Heading as="h3" className={styles.title}>
          {title}
        </Heading>
        <div ref={ref} className={styles.text}>
          <Paragraph>{text}</Paragraph>
          <ComponentWithLineAdornment
            as="Link"
            href="about"
            color="black"
            className={styles.link}
          >
            {t("view more", { ns: "common" })}
          </ComponentWithLineAdornment>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={image1.src}
            width={image1.width}
            height={image1.height}
            alt=""
            className={styles.founderPhoto}
            sizes="100vw"
          />
          <Image
            className={classNames(
              styles.backdropPhoto,
              !inView && styles.hiding
            )}
            src={image2.src}
            width={image2.width}
            height={image2.height}
            alt=""
          />
        </div>
        <span className={styles.founderTitle}>
          ( {t("about.founder title")} )
        </span>
      </div>
      <BackgroundSvg
        ref={bgRef}
        style={bgStyle}
        className={styles.backgroundSvg}
      />
    </div>
  )
}

export default HomeAbout
