import utilStyles from "styles/utils.module.css"
import styles from "./ProjectScreen.module.css"
import ScreenTitle from "components/ScreenTitle"
import ProjectScreenSwiper from "./Swiper"
import LinkWithLine from "components/LinkWithLine"
import classNames from "classnames"
import H2 from "components/H2"
import P from "components/P"

const title =
  "Through the last years we worked on more than 100 projects located all"
const paragraph =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular objects, creating "

function ProjectsScreen() {
  return (
    <div className={classNames(utilStyles.wrapper, styles.wrapper)}>
      <div className={styles.textWrapper}>
        <ScreenTitle className={styles.screenTitle}>our projects</ScreenTitle>
        <H2>{title}</H2>
        <P>{paragraph}</P>
      </div>
      <ProjectScreenSwiper className={styles.swiper} />
      <LinkWithLine color="black" className={styles.link}>
        view more
      </LinkWithLine>
    </div>
  )
}

export default ProjectsScreen
