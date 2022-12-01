import { NextPageWithLayoutConfig } from "pages/_app"
import AboutHeading from "modules/about/AboutHeading"
import AboutCollage from "modules/about/AboutCollage"
import AboutQuote from "modules/about/AboutQuote"
import AboutBubbles from "modules/about/AboutBubbles"
import AboutPhoto from "modules/about/AboutPhoto"
import AboutPhilosophy from "modules/about/AboutPhilosophy"

const About: NextPageWithLayoutConfig = () => {
  return (
    <>
      <AboutHeading />
      <AboutCollage />
      <AboutQuote />
      <AboutBubbles />
      <AboutPhoto />
      <AboutPhilosophy />
    </>
  )
}

export default About

About.layoutConfig = {
  adaptiveHeaderTransparency: false,
}
