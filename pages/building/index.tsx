import { NextPageWithLayoutConfig } from "pages/_app"
import BuildingHeading from "modules/building/BuildingHeading"
import BuildingPhoto from "modules/building/BuildingPhoto"
import BuildingPoints from "modules/building/BuildingPonts"
import BuildingBenefits from "modules/building/BuildingBenefits"
import BuildingPreparation from "modules/building/BuildingPreparation"

const Building: NextPageWithLayoutConfig = () => {
  return (
    <>
      <BuildingHeading />
      <BuildingPhoto />
      <BuildingPoints />
      <BuildingBenefits />
      <BuildingPreparation />
    </>
  )
}

Building.layoutConfig = {
  adaptiveHeaderTransparency: false,
}

export default Building
