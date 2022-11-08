import GreetingScreen from "modules/home/GreetingScreen"
import AboutCompanyScreen from "modules/home/AboutCompanyScreen"
import PapersScreen from "modules/home/PapersScreen"
import ProjectsScreen from "modules/home/ProjectsScreen"

export default function Home() {
  return (
    <>
      <GreetingScreen />
      <AboutCompanyScreen />
      <PapersScreen />
      <ProjectsScreen />
    </>
  )
}
