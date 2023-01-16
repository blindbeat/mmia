import { useState } from "react"
import ProjectsTagButtons from "modules/projects/ProjectsTagButtons"
import styles from "./Projects.module.css"
import classNames from "classnames"
import { GetServerSideProps } from "next"
import ProjectsList from "modules/projects/ProjectsList"
import { Project, TagWithCount } from "misc/types"
import { NextPageWithLayoutConfig } from "pages/_app"
import { fetchProjects } from "api/fetchProjects"
import { fetchCategories } from "api"

interface Props {
  projects: Project[]
  tags: TagWithCount[]
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const projects = (await fetchProjects()).data
  const tags = await fetchCategories()
  return {
    props: {
      projects,
      tags,
    },
  }
}

const Projects: NextPageWithLayoutConfig<Props> = ({ tags, projects }) => {
  const [selectedTag, setSelectedTag] = useState<number | null>(null)
  return (
    <div className={classNames(styles.projects)}>
      <ProjectsTagButtons tagSelector={setSelectedTag} tags={tags} />
      <ProjectsList projects={projects} />
    </div>
  )
}

Projects.layoutConfig = {
  HeaderAdaptiveTransparency: false,
}

export default Projects
