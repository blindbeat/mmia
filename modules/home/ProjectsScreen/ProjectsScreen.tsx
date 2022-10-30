import baseStyles from "modules/home/Home.module.css"
import styles from "./ProjectScreen.module.css"
import ScreenTitle from "components/ScreenTitle"
import ProjectScreenSwiper from "modules/home/ProjectsScreen/Swiper/ProjectScreenSwiper"
import Link from "components/Link"
import classNames from "classnames"

const title =
  "Through the last years, we worked on more than 100 projects located all"
const paragraph =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular objects, creating "

function ProjectsScreen() {
  return (
    <div className={classNames(baseStyles.wrapper, styles.wrapper)}>
      <div className={styles.textWrapper}>
        <ScreenTitle className={styles.screenTitle}>our projects</ScreenTitle>
        <h2>{title}</h2>
        <p>{paragraph}</p>
      </div>
      <ProjectScreenSwiper />
      <Link lineColor="black" wrapperClassName={styles.link} />
    </div>
  )
}

export default ProjectsScreen
