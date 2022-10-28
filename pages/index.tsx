import type { NextPage } from "next"
import GreetingScreen from "modules/home/GreetingScreen"
import AboutCompanyScreen from "modules/home/AboutCompanyScreen"
import PapersScreen from "modules/home/PapersScreen"

const Home: NextPage = () => {
  return (
    <>
      <GreetingScreen />
      <AboutCompanyScreen />
      <PapersScreen />
    </>
  )
}

export default Home
