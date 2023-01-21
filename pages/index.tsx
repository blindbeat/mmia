import HomeLanding from "modules/home/HomeLanding"
import HomeAbout from "modules/home/HomeAbout"
import HomePapers from "modules/home/HomePapers"
import HomeProjects from "modules/home/HomeProjects"
import { NextPageWithLayoutConfig } from "./_app"
import { fetchHome } from "api/fetchHome"
import { GetServerSideProps } from "next"
import { HomeLandingContent, HomeProjectsContent } from "types"
import { fetchProjects } from "api"

interface Props {
  landingBlock: HomeLandingContent
  projectsBlock: HomeProjectsContent
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const landing = await fetchHome()
  const projects = (await fetchProjects()).data.slice(-3)
  return {
    props: {
      landingBlock: {
        projects: landing.projects.map(
          ({ heading, description, image, slug }) => ({
            heading,
            description,
            image,
            slug,
          })
        ),
      },
      projectsBlock: {
        projects,
      },
    },
  }
}

const Home: NextPageWithLayoutConfig<Props> = ({
  landingBlock,
  projectsBlock,
}: Props) => {
  return (
    <>
      <HomeLanding projects={landingBlock.projects} />
      <HomeAbout />
      <HomePapers />
      <HomeProjects projects={projectsBlock.projects} />
    </>
  )
}

Home.layoutConfig = {
  headerMargin: null,
}

export default Home
