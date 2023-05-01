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
import { useTranslation } from "next-i18next"

const HomeProjects = ({
  title,
  description,
  projects,
}: HomeProjectsContent) => {
  const { t } = useTranslation(["home", "common"])

  return (
    <div className={classNames(utilStyles.wrapper, styles.wrapper)}>
      <div className={styles.textWrapper}>
        <ScreenTitle className={styles.screenTitle}>
          {t("projects.our projects")}
        </ScreenTitle>
        <Heading as="h3">{title}</Heading>
        <Paragraph>{description}</Paragraph>
      </div>
      <HomeProjectsSwiper projects={projects} className={styles.swiper} />
      <ComponentWithLineAdornment
        href="projects"
        color="black"
        className={styles.link}
      >
        {t("view more", { ns: "common" })}
      </ComponentWithLineAdornment>
    </div>
  )
}

export default HomeProjects
