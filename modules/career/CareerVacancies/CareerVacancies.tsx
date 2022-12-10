import styles from "./CareerVacancies.module.css"
import { dummyVacancies } from "assets/dummyText"
import vacancyIllustration from "assets/dummyPics/career/careerVacancies/vacancy.png"
import Image from "next/image"
import { LinkWithLine } from "components"
import classNames from "classnames"

export const CareerVacancies = () => {
  return (
    <div className={styles.content}>
      {dummyVacancies.map((vacancy, index) => (
        <div
          key={index}
          className={styles.vacancy}
          style={{
            top: `calc(var(--headerHeight) + ${index} * var(--stepGap))`,
          }}
        >
          <div className={styles.illustrationBlock}>
            <div className={classNames(styles.illustrationIndex, "a1")}>
              vacancy / {index + 1}
            </div>
            <Image
              src={vacancyIllustration}
              alt={`${vacancy.name} illustration`}
              className={styles.illustrationImage}
            />
          </div>
          <div className={styles.vacancyDescription}>
            <div className={styles.vacancyHeader}>
              <h3>{vacancy.name}</h3>
              <div className={styles.square}></div>
            </div>
            <p>{vacancy.description}</p>
            <LinkWithLine color="black" className={styles.link}>
              view more
            </LinkWithLine>
          </div>
        </div>
      ))}
    </div>
  )
}
