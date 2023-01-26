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
import { fetchAbout, fetchProjects } from "api"

interface Props {
  landingBlock: HomeLandingContent
  projectsBlock: HomeProjectsContent
  aboutBlock: HomeAboutContent
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => {
  locale ||= "en"
  const landing = await fetchHome(locale)
  const projects = (await fetchProjects(locale)).data.slice(-3)
  const about = await fetchAbout(locale)
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
      aboutBlock: {
        title: about.title,
        image1: about.image1,
        image2: about.image2,
        text: about.text,
      },
    },
  }
}

const Home: NextPageWithLayoutConfig<Props> = ({
  landingBlock,
  projectsBlock,
  aboutBlock,
}: Props) => {
  return (
    <>
      <HomeLanding projects={landingBlock.projects} />
      <HomeAbout {...aboutBlock} />
      <HomePapers />
      <HomeProjects projects={projectsBlock.projects} />
    </>
  )
}

Home.layoutConfig = {
  headerMargin: null,
}

export default Home
