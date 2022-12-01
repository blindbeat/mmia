import styles from "./AboutVacancies.module.css"
import { Vacancy } from "misc/types"
import { dummyVacancies } from "assets/dummyText"
import classNames from "classnames"

const AboutVacancies = () => {
  return (
    <div className={styles.content}>
      {dummyVacancies.map((vacancy, index) => (
        <VacancyElem key={index} vacancy={vacancy} />
      ))}
    </div>
  )
}

export default AboutVacancies

const VacancyElem = ({ vacancy }: { vacancy: Vacancy }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.card}>
        <div className={classNames("h6", styles.vacancyName)}>
          {vacancy.name}
        </div>
        <div className={styles.vacancyLocation}>
          <span>{vacancy.country}</span>
          <svg
            viewBox="0 0 3 1"
            className={styles.vacancyLine}
            preserveAspectRatio="none"
          >
            <line
              x1={0}
              y1={0}
              x2={3}
              y2={0}
              stroke="black"
              vectorEffect="non-scaling-stroke"
            ></line>
          </svg>
          <span>{vacancy.city}</span>
        </div>
        <div className={styles.vacancyEmploymentTime}>
          {vacancy.employmentTime}
        </div>
        <div className={styles.vacancyDropRequest}>
          drop request
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 119 6"
            fill="none"
          >
            <path
              opacity="0.2"
              d="M0.697266 1.31641C33.5171 6.80892 75.8591 3.58474 118.644 4.87593"
              stroke="black"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
