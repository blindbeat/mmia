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
import { HomeProjectsContent } from "types"

const HomeProjects = ({
  title,
  description,
  projects,
}: HomeProjectsContent) => {
  return (
    <div className={classNames(utilStyles.wrapper, styles.wrapper)}>
      <div className={styles.textWrapper}>
        <ScreenTitle className={styles.screenTitle}>our projects</ScreenTitle>
        <Heading as="h3">{title}</Heading>
        <Paragraph>{description}</Paragraph>
      </div>
      <HomeProjectsSwiper projects={projects} className={styles.swiper} />
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
