import { NextPageWithLayoutConfig } from "pages/_app"
import { CareerVacancies } from "modules/career"

const Career: NextPageWithLayoutConfig = () => {
  return <CareerVacancies />
}

Career.layoutConfig = {
  adaptiveHeaderTransparency: false,
  adaptiveHeaderHiding: 1024,
  showFooter: false,
  headerMargin: "0",
}

export default Career
