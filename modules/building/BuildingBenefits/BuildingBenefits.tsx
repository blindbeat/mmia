import styles from "./BuildingBenefits.module.css"
import { Heading, Paragraph, ScreenTitle } from "components"
import Bubbles from "modules/blocks/Bubbles"
import { ArrayEntrySanitized } from "types"
import { useTranslation } from "next-i18next"

interface Props {
  title: string
  description: string
  circles: ArrayEntrySanitized[]
}
const BuildingBenefits = ({ title, description, circles }: Props) => {
  const { t } = useTranslation(["building"])

  return (
    <div className={styles.content}>
      <div className={styles.text}>
        <ScreenTitle className={styles.title}>{t("benefits")}</ScreenTitle>
        <Heading as="h3" className={styles.heading}>
          {title}
        </Heading>
        <Paragraph className={styles.paragraph}>{description}</Paragraph>
      </div>
      <Bubbles bubbles={circles} />
    </div>
  )
}
export default BuildingBenefits
