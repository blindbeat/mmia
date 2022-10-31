import type { NextPage } from "next"
import GreetingScreen from "modules/home/GreetingScreen"
import AboutCompanyScreen from "modules/home/AboutCompanyScreen"
import PapersScreen from "modules/home/PapersScreen"
import ProjectsScreen from "modules/home/ProjectsScreen"
import Footer from "Layout/Footer"

const Home: NextPage = () => {
  return (
    <>
      <GreetingScreen />
      <AboutCompanyScreen />
      <PapersScreen />
      <ProjectsScreen />
      <Footer />
    </>
  )
}

export default Home
