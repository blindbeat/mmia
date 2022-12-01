import { NextPageWithLayoutConfig } from "pages/_app"
import AboutHeading from "modules/about/AboutHeading"
import AboutCollage from "modules/about/AboutCollage"
import AboutQuote from "modules/about/AboutQuote"

const About: NextPageWithLayoutConfig = () => {
  return (
    <>
      <AboutHeading />
      <AboutCollage />
      <AboutQuote />
    </>
  )
}

export default About

About.layoutConfig = {
  adaptiveHeaderTransparency: false,
}
