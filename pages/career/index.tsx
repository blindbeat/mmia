import { NextPageWithLayoutConfig } from "pages/_app"
import CareerVacancies from "modules/career/CareerVacancies"

const Career: NextPageWithLayoutConfig = () => {
  return <CareerVacancies />
}

Career.layoutConfig = {
  HeaderAdaptiveTransparency: false,
  HeaderAdaptiveHidingBreakpoint: 1024,
  showFooter: false,
  headerMargin: "0",
}

export default Career
