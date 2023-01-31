import styles from "./BuildingPoints.module.css"
import Icon from "assets/dummyPics/building/buildingPoints/dummyIcon.svg"
import classNames from "classnames"
import { ArrayEntrySanitized } from "types"

interface Props {
  points: ArrayEntrySanitized[]
}
const BuildingPoints = ({ points }: Props) => {
  return (
    <div className={styles.content}>
      {points.map((point) => (
        <Point point={point} key={point.key} />
      ))}
    </div>
  )
}

export default BuildingPoints

interface PointProps {
  point: ArrayEntrySanitized
}
const Point = ({ point: { title, description } }: PointProps) => {
  return (
    <div className={styles.onePoint}>
      <Icon className={styles.icon} />
      <h5 className={classNames(styles.heading, "h6")}>{title}</h5>
      <p>{description}</p>
    </div>
  )
}
