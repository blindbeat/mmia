import { NextPageWithLayoutConfig } from "pages/_app"
import AboutHeading from "modules/about/AboutHeading"
import AboutCollage from "modules/about/AboutCollage"
import AboutQuote from "modules/about/AboutQuote"
import AboutBubbles from "modules/about/AboutBubbles"
import AboutPhoto from "modules/about/AboutPhoto"
import AboutPhilosophy from "modules/about/AboutPhilosophy"
import AboutWordTape from "modules/about/AboutWordtape"
import AboutVacancies from "modules/about/AboutVacancies"
import { AboutPage } from "types"
import { GetServerSideProps } from "next"
import { fetchAbout } from "api"

export const getServerSideProps: GetServerSideProps<AboutPage> = async ({
  locale,
}) => {
  locale ||= "en"
  const {
    title,
    text,
    image1,
    image2,
    quote,
    quote_name,
    image,
    running_title1,
    running_title2,
    after_quote_title,
    before_running_text,
    vacancies,
  } = await fetchAbout(locale)

  return {
    props: {
      title: title,
      collageTexts: [text, text],
      collagePhotos: {
        founder: image1,
        office: image2,
      },
      quote: {
        text: quote,
        author: quote_name,
      },
      parallaxImage: image,
      tapes: [running_title1, running_title2],
      tapesAfterword: after_quote_title,
      philosophy: before_running_text,
      vacancies,
    },
  }
}

const About: NextPageWithLayoutConfig<AboutPage> = ({
  title,
  collageTexts,
  collagePhotos,
  parallaxImage,
  quote,
  tapes,
  tapesAfterword,
  philosophy,
  vacancies,
}) => {
  return (
    <>
      <AboutHeading title={title} />
      <AboutCollage
        textArr={collageTexts}
        founderPhoto={collagePhotos.founder}
        officePhoto={collagePhotos.office}
      />
      <AboutQuote text={quote.text} author={quote.author} />
      <AboutBubbles />
      <AboutPhoto image={parallaxImage} />
      <AboutPhilosophy text={philosophy} />
      <AboutWordTape tapes={tapes} afterword={tapesAfterword} />
      <AboutVacancies vacancies={vacancies} />
    </>
  )
}

export default About

About.layoutConfig = {
  HeaderAdaptiveTransparency: false,
}
