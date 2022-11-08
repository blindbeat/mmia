import { useState } from "react"
import TagButtons from "modules/projects/TagButtons"
import styles from "./Projects.module.css"
import utilStyles from "styles/utils.module.css"
import classNames from "classnames"
import { GetStaticProps } from "next"
import ProjectsList from "modules/projects/ProjectsList"
import { ProjectBrief } from "misc/types"
import projectPhoto1 from "assets/dummyPics/ourProjects/1.jpg"
import { NextPageWithLayoutConfig } from "pages/_app"

interface Props {
  tags: string[]
  projects: ProjectBrief[]
}

const dummyProject: ProjectBrief = {
  title: "Cardiovascular Hospital in Briukhovychi",
  tags: ["interior", "architecture"],
  image: projectPhoto1,
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      tags: ["architecture", "interior", "building"],
      projects: new Array(20).fill(dummyProject),
    },
  }
}

const Projects: NextPageWithLayoutConfig<Props> = ({ tags, projects }) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  return (
    <div className={classNames(utilStyles.wrapper, styles.projects)}>
      <TagButtons tagSelector={setSelectedTag} tags={tags} />
      <ProjectsList projects={projects} />
    </div>
  )
}

Projects.layoutConfig = {
  adaptiveHeaderTransparency: false,
}

export default Projects
