import styles from "./BuildingPoints.module.css"
import Icon from "assets/dummyPics/dummyIcon.svg"

const title = "The method of major"
const paragraph =
  "The method of major overhaul is more than renewal of the resource with a partial replacement for the necessary structural elements, including load-bearing and fenced structures of objects, as well as systems of engineering possession, improvement of their operational indicators. Carrying out a major "

const BuildingPoints = () => {
  return (
    <div className={styles.content}>
      {[...new Array(4)].map((_, index) => (
        <OnePoint key={index} />
      ))}
    </div>
  )
}

export default BuildingPoints

const OnePoint = () => {
  return (
    <div className={styles.onePoint}>
      <Icon className={styles.icon} />
      <h4 className={styles.heading}>{title}</h4>
      <p>{paragraph}</p>
    </div>
  )
}