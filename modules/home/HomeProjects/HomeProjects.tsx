import utilStyles from "styles/utils.module.css"
import styles from "./HomeProjects.module.css"
import {
  ComponentWithLineAdornment,
  Heading,
  Paragraph,
  ScreenTitle,
} from "components"
import HomeProjectsSwiper from "./Swiper"
import classNames from "classnames"

const title =
  "Through the last years we worked on more than 100 projects located all"
const paragraph =
  "AIMM is the team that implements project ideas into reality. We see architecture as a unique product, created at the intersection of the zeitgeist, and the development of engineering. We design spectacular objects, creating "

const HomeProjects = () => {
  return (
    <div className={classNames(utilStyles.wrapper, styles.wrapper)}>
      <div className={styles.textWrapper}>
        <ScreenTitle className={styles.screenTitle}>our projects</ScreenTitle>
        <Heading as="h3">{title}</Heading>
        <Paragraph>{paragraph}</Paragraph>
      </div>
      <HomeProjectsSwiper className={styles.swiper} />
      <ComponentWithLineAdornment
        href="projects"
        color="black"
        className={styles.link}
      >
        view more
      </ComponentWithLineAdornment>
    </div>
  )
}

export default HomeProjects
