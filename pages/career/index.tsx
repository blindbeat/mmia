import { NextPageWithLayoutConfig } from "pages/_app"

const Career: NextPageWithLayoutConfig = () => {
  return <div>test</div>
}

Career.layoutConfig = {
  adaptiveHeaderTransparency: false,
  showFooter: false,
  headerMargin: "0px",
}

export default Career
