import styles from "./AboutPhilosophy.module.css"
import { ScreenTitle } from "components"
import { useTranslation } from "next-i18next"

interface Props {
  text: string
}
const AboutPhilosophy = ({ text }: Props) => {
  const { t } = useTranslation(["about"])

  return (
    <div className={styles.content}>
      <ScreenTitle>{t("philosophy")}</ScreenTitle>
      <p>{text}</p>
    </div>
  )
}

export default AboutPhilosophy
