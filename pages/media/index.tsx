import { NextPageWithLayoutConfig } from "pages/_app"
import { MediaHeading } from "modules/media/MediaHeading"

const Media: NextPageWithLayoutConfig = () => {
  return <MediaHeading />
}

Media.layoutConfig = {
  adaptiveHeaderTransparency: false,
}

export default Media
