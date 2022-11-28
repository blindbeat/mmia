import GreetingScreen from "modules/home/GreetingScreen"
import AboutCompanyScreen from "modules/home/AboutCompanyScreen"
import PapersScreen from "modules/home/PapersScreen"
import ProjectsScreen from "modules/home/ProjectsScreen"
import { NextPageWithLayoutConfig } from "./_app"

const Home: NextPageWithLayoutConfig = () => {
  return (
    <>
      <GreetingScreen />
      <AboutCompanyScreen />
      <PapersScreen />
      <ProjectsScreen />
    </>
  )
}

Home.layoutConfig = {
  headerMargin: null,
}

export default Home
