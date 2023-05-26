import styles from "./CareerVacancies.module.css"
import Image from "next/image"
import { ComponentWithLineAdornment } from "components"
import classNames from "classnames"
import { Vacancy } from "types"
import { useTranslation } from "next-i18next"

interface Props {
  vacancies: Vacancy[]
}
const CareerVacancies = ({ vacancies }: Props) => {
  const { t } = useTranslation(["career", "common"])
  return (
    <div className={styles.content}>
      {vacancies.map((vacancy, index) => (
        <div
          key={index}
          className={styles.vacancy}
          style={{
            top: `calc(var(--headerHeight) + ${index} * var(--stepGap))`,
          }}
        >
          <div className={styles.illustrationBlock}>
            <div className={classNames(styles.illustrationIndex, "a1")}>
              {t("vacancy")} / {index + 1}
            </div>
            <Image
              src={vacancy.image}
              alt={`${vacancy.name} illustration`}
              className={styles.illustrationImage}
            />
          </div>
          <div className={styles.vacancyDescription}>
            <div className={styles.vacancyHeader}>
              <h3>{vacancy.name}</h3>
              <div className={styles.square}></div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: vacancy.description }}
              className={styles.vacancyText}
            />
            <ComponentWithLineAdornment
              as="a"
              href=""
              color="black"
              className={styles.link}
            >
              {t("view more", { ns: "common" })}
            </ComponentWithLineAdornment>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CareerVacancies
