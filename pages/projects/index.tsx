import { useState } from "react"
import ProjectsTagButtons from "modules/projects/ProjectsTagButtons"
import styles from "./Projects.module.css"
import classNames from "classnames"
import { GetStaticProps } from "next"
import ProjectsList from "modules/projects/ProjectsList"
import { ProjectBrief } from "misc/types"
import projectPhoto1 from "assets/dummyPics/home/homeProjects/1.jpg"
import { NextPageWithLayoutConfig } from "pages/_app"
import { tags, title } from "assets/dummyText"

interface Props {
  tags: string[]
  projects: ProjectBrief[]
}

const dummyProject: ProjectBrief = {
  title,
  tags,
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
    <div className={classNames(styles.projects)}>
      <ProjectsTagButtons tagSelector={setSelectedTag} tags={tags} />
      <ProjectsList projects={projects} />
    </div>
  )
}

Projects.layoutConfig = {
  adaptiveHeaderTransparency: false,
}

export default Projects
