import { NextPageWithLayoutConfig } from "pages/_app"
import AboutHeading from "modules/about/AboutHeading"
import AboutCollage from "modules/about/AboutCollage"
import AboutQuote from "modules/about/AboutQuote"
import AboutBubbles from "modules/about/AboutBubbles"
import AboutPhoto from "modules/about/AboutPhoto"
import AboutPhilosophy from "modules/about/AboutPhilosophy"
import AboutWordTape from "modules/about/AboutWordtape"
import AboutVacancies from "modules/about/AboutVacancies"

const About: NextPageWithLayoutConfig = () => {
  return (
    <>
      <AboutHeading />
      <AboutCollage />
      <AboutQuote />
      <AboutBubbles />
      <AboutPhoto />
      <AboutPhilosophy />
      <AboutWordTape />
      <AboutVacancies />
    </>
  )
}

export default About

About.layoutConfig = {
  HeaderAdaptiveTransparency: false,
}
