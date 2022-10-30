import type { NextPage } from "next"
import GreetingScreen from "modules/home/GreetingScreen"
import AboutCompanyScreen from "modules/home/AboutCompanyScreen"
import PapersScreen from "modules/home/PapersScreen"
import ProjectsScreen from "modules/home/ProjectsScreen"

const Home: NextPage = () => {
  return (
    <>
      <GreetingScreen />
      <AboutCompanyScreen />
      <PapersScreen />
      <ProjectsScreen />
    </>
  )
}

export default Home
