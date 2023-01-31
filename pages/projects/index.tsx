import { useState } from "react"
import ProjectsTagButtons from "modules/projects/ProjectsTagButtons"
import styles from "./Projects.module.css"
import classNames from "classnames"
import { GetServerSideProps } from "next"
import ProjectsList from "modules/projects/ProjectsList"
import { ProjectWithoutCoordsBrief, TagWithCount } from "types"
import { NextPageWithLayoutConfig } from "pages/_app"
import { fetchProjects } from "api/fetchProjects"
import { fetchCategories } from "api"

interface Props {
  projects: ProjectWithoutCoordsBrief[]
  tags: TagWithCount[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => {
  locale ||= "en"
  const projects = (await fetchProjects(locale)).data
  const tags = await fetchCategories(locale)
  return {
    props: {
      projects,
      tags,
    },
  }
}

const Projects: NextPageWithLayoutConfig<Props> = ({ tags, projects }) => {
  const [selectedTag, setSelectedTag] = useState<number | null>(null)
  const [initialProjectsDelay, setInitialProjectsDelay] = useState(true)

  const handleSelectedTag = (tag: number | null) => {
    setInitialProjectsDelay(false)
    setSelectedTag(tag)
  }

  const projectsAmount = projects.length

  if (selectedTag !== null) {
    projects = projects.filter((project) =>
      project.categories.some((category) => category.id === selectedTag)
    )
  }

  return (
    <div className={classNames(styles.projects)}>
      <ProjectsTagButtons
        tagSelector={handleSelectedTag}
        tags={tags}
        projectsAmount={projectsAmount}
      />
      <ProjectsList
        projects={projects}
        withDelay={initialProjectsDelay}
        key={selectedTag}
      />
    </div>
  )
}

Projects.layoutConfig = {
  HeaderAdaptiveTransparency: false,
}

export default Projects
