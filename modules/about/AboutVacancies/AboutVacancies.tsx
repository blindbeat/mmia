import styles from "./AboutVacancies.module.css"
import { Vacancy } from "misc/types"
import { dummyVacancies } from "assets/dummyText"
import classNames from "classnames"
import { motion } from "framer-motion"
import Tilt from "react-parallax-tilt"
import { ComponentPropsWithoutRef, useState } from "react"
import { useThresholdObserver } from "hooks"

interface Position {
  top: number
  left: number
  rotate: number
}

const positions: Position[] = [
  { top: 75, left: 60, rotate: 0.19 },
  { top: 70, left: 5, rotate: 1.73 },
  { top: 50, left: 87, rotate: -1.74 },
  { top: 40, left: 40, rotate: -1.05 },
  { top: 15, left: 80, rotate: 6.24 },
  { top: 15, left: 10, rotate: 1.5 },
]
const AboutVacancies = () => {
  const [lastHoveredCard, setLastHoveredCard] = useState<number | null>(null)
  return (
    <div className={styles.content}>
      {dummyVacancies.map((vacancy, index) => (
        <VacancyElem
          key={index}
          vacancy={vacancy}
          position={positions[index]}
          onMouseEnter={() => setLastHoveredCard(index)}
          isFirstPlan={lastHoveredCard === index}
        />
      ))}
    </div>
  )
}

export default AboutVacancies

const duration = 0.2

interface VacancyProps extends ComponentPropsWithoutRef<"div"> {
  vacancy: Vacancy
  position: Position
  isFirstPlan: boolean
}
const VacancyElem = ({
  vacancy,
  position,
  onMouseEnter,
  isFirstPlan,
}: VacancyProps) => {
  const extendsThreshold = useThresholdObserver(768)
  const style = extendsThreshold
    ? {
        top: `${position.top}%`,
        left: `${position.left}%`,
        rotate: position.rotate,
        x: `-50%`,
        y: `-50%`,
      }
    : {}
  return (
    <motion.div
      className={styles.cardWrapper}
      onMouseEnter={onMouseEnter}
      style={{
        ...style,
        zIndex: isFirstPlan ? 1 : undefined,
      }}
    >
      <Tilt tiltEnable={extendsThreshold}>
        <motion.a
          href="https://google.com"
          className={styles.card}
          animate="default"
          whileHover="hover"
          variants={{
            default: {
              backgroundColor: "#f8f8f8",
              color: "#000",
            },
            hover: {
              backgroundColor: `#171717`,
              color: "#fff",
            },
          }}
          transition={{
            duration,
          }}
        >
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
              <motion.line
                x1={0}
                y1={1}
                x2={3}
                y2={1}
                variants={{
                  default: {
                    stroke: "#000",
                  },
                  hover: {
                    stroke: "#fff",
                  },
                }}
                transition={{
                  duration,
                }}
                vectorEffect="non-scaling-stroke"
              ></motion.line>
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
              viewBox="0 0 76 4"
              fill="none"
              preserveAspectRatio="none"
            >
              <motion.path
                opacity="0.2"
                d="M1.03955 1.07422C21.7174 5.56788 48.1964 1.05979 75.0396 1.05156"
                variants={{
                  default: {
                    stroke: "#000",
                  },
                  hover: {
                    stroke: "#fff",
                  },
                }}
                transition={{
                  duration,
                }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </motion.a>
      </Tilt>
    </motion.div>
  )
}
