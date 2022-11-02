import GreetingScreen from "modules/home/GreetingScreen"
import AboutCompanyScreen from "modules/home/AboutCompanyScreen"
import PapersScreen from "modules/home/PapersScreen"
import ProjectsScreen from "modules/home/ProjectsScreen"
import Footer from "Layout/Footer"
import Header from "Layout/Header"

function Home() {
  return (
    <>
      <Header />
      <GreetingScreen />
      <AboutCompanyScreen />
      <PapersScreen />
      <ProjectsScreen />
      <Footer />
    </>
  )
}

export default Home
