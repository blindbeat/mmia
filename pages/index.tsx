import type { NextPage } from "next"
import GreetingScreen from "modules/home/GreetingScreen/GreetingScreen"
import AboutCompany from "modules/home/AboutCompany/AboutCompany"

const Home: NextPage = () => {
  return (
    <>
      <GreetingScreen />
      <AboutCompany />
    </>
  )
}

export default Home
