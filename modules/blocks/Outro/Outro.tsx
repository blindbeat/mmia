import styles from "./Outro.module.css"
import WordsSwiper from "./WordsSwiper"
import ImagesSwiper from "./ImagesSwiper"
import { ComponentWithLineAdornment, Paragraph } from "components"
import BackgroundImage from "./assets/backgroundLine.svg"
import { useAnimateLine } from "hooks"
import { useTranslation } from "next-i18next"

const Outro = () => {
  const { t } = useTranslation(["common"])

  const { ref, style } = useAnimateLine()
  return (
    <div className={styles.content}>
      <h3 className={styles.header}>{t("outro.title")}</h3>
      <WordsSwiper />
      <ImagesSwiper />
      <div className={styles.paragraphWrapper}>
        <Paragraph className={styles.paragraph}>
          {t("outro.verbiage")}
        </Paragraph>
      </div>
      <ComponentWithLineAdornment
        as="button"
        color="black"
        className={styles.CTA}
      >
        {t("drop request")}
      </ComponentWithLineAdornment>
      <BackgroundImage
        ref={ref}
        style={style}
        className={styles.backgroundImage}
      />
    </div>
  )
}

export default Outro
