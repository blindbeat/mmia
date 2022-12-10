import HomeLanding from "modules/home/HomeLanding"
import HomeAbout from "modules/home/HomeAbout"
import HomePapers from "modules/home/HomePapers"
import HomeProjects from "modules/home/HomeProjects"
import { NextPageWithLayoutConfig } from "./_app"

const Home: NextPageWithLayoutConfig = () => {
  return (
    <>
      <HomeLanding />
      <HomeAbout />
      <HomePapers />
      <HomeProjects />
    </>
  )
}

Home.layoutConfig = {
  headerMargin: null,
}

export default Home
