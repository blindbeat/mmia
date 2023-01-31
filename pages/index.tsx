import HomeLanding from "modules/home/HomeLanding"
import HomeAbout from "modules/home/HomeAbout"
import HomePapers from "modules/home/HomePapers"
import HomeProjects from "modules/home/HomeProjects"
import { NextPageWithLayoutConfig } from "./_app"
import { fetchHome } from "api/fetchHome"
import { GetServerSideProps } from "next"
import {
  HomeAboutContent,
  HomeLandingContent,
  HomeProjectsContent,
} from "types"
import { fetchAbout, fetchBuilding, fetchProjects } from "api"
import { HomeBuildingContent } from "types/pageTypes/buildingTypes"

interface Props {
  landingBlock: HomeLandingContent
  projectsBlock: HomeProjectsContent
  aboutBlock: HomeAboutContent
  buildingBlock: HomeBuildingContent
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => {
  locale ||= "en"
  const landing = await fetchHome(locale)
  const projects = (await fetchProjects(locale)).data.slice(-3)
  const about = await fetchAbout(locale)
  const building = await fetchBuilding(locale)
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
        title: landing.projects_title,
        description: landing.projects_description,
      },
      aboutBlock: {
        title: about.title,
        image1: about.image1,
        image2: about.image2,
        text: about.text,
      },
      buildingBlock: {
        title: building.home.title,
        description: building.home.description,
        image: building.image,
        content: building.preparation.blocks,
      },
    },
  }
}

const Home: NextPageWithLayoutConfig<Props> = ({
  landingBlock,
  projectsBlock,
  aboutBlock,
  buildingBlock,
}: Props) => {
  return (
    <>
      <HomeLanding {...landingBlock} />
      <HomeAbout {...aboutBlock} />
      <HomePapers {...buildingBlock} />
      <HomeProjects {...projectsBlock} />
    </>
  )
}

Home.layoutConfig = {
  headerMargin: null,
}

export default Home
