import { NextPageWithLayoutConfig } from "pages/_app"
import BuildingHeading from "modules/building/BuildingHeading"
import BuildingPhoto from "modules/building/BuildingPhoto"
import BuildingPoints from "modules/building/BuildingPonts"
import BuildingBenefits from "modules/building/BuildingBenefits"
import BuildingPreparation from "modules/building/BuildingPreparation"
import BuildingGallery from "modules/building/BuildingGallery"
import Outro from "modules/blocks/Outro/Outro"

const Building: NextPageWithLayoutConfig = () => {
  return (
    <>
      <BuildingHeading />
      <BuildingPhoto />
      <BuildingPoints />
      <BuildingBenefits />
      <BuildingPreparation />
      <BuildingGallery />
      <Outro />
    </>
  )
}

Building.layoutConfig = {
  adaptiveHeaderTransparency: false,
}

export default Building
