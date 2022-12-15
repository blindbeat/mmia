import { NextPageWithLayoutConfig } from "pages/_app"
import { MediaHeading } from "modules/media/MediaHeading"
import { MediaCards } from "modules/media/MediaCards"
import { Media } from "misc/types"
import logo1 from "assets/dummyPics/media/logos/1.png"
import logo2 from "assets/dummyPics/media/logos/2.png"
import logo3 from "assets/dummyPics/media/logos/3.png"
import hoverImage from "assets/dummyPics/media/backgroundPhoto.jpeg"
import { GetStaticProps } from "next"

const mediaArr: Media[] = [
  {
    logo: logo1,
    hoverImage: hoverImage,
    link: "",
  },
  {
    logo: logo2,
    hoverImage: hoverImage,
    link: "",
  },
  {
    logo: logo3,
    hoverImage: hoverImage,
    link: "",
  },
  {
    logo: logo1,
    hoverImage: hoverImage,
    link: "",
  },
]
export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {
      mediaArr: [...new Array(4).fill(mediaArr).flat()],
    },
  }
}

interface Props {
  mediaArr: Media[]
}
const Media: NextPageWithLayoutConfig<Props> = ({ mediaArr }) => {
  return (
    <>
      <MediaHeading />
      <MediaCards mediaArr={mediaArr} />
    </>
  )
}

Media.layoutConfig = {
  HeaderAdaptiveTransparency: false,
}

export default Media
