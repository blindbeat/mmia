import { NextPageWithLayoutConfig } from "pages/_app"
import BuildingHeading from "modules/building/BuildingHeading"
import BuildingPhoto from "modules/building/BuildingPhoto"
import BuildingPoints from "modules/building/BuildingPonts"
import BuildingBenefits from "modules/building/BuildingBenefits"
import BuildingPreparation from "modules/building/BuildingPreparation"
import BuildingGallery from "modules/building/BuildingGallery"
import Outro from "modules/blocks/Outro"
import { GetServerSideProps } from "next"
import { BuildingPage } from "types"
import { fetchBuilding } from "api"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps: GetServerSideProps<BuildingPage> = async ({
  locale,
}) => {
  locale ||= "en"
  const { title, image, points, benefits, preparation, gallery } =
    await fetchBuilding(locale)
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "building"])),
      title,
      parallaxImage: image,
      points,
      benefits,
      preparation,
      gallery,
    },
  }
}

const Building: NextPageWithLayoutConfig<BuildingPage> = ({
  title,
  parallaxImage,
  points,
  benefits,
  preparation,
  gallery,
}) => {
  return (
    <>
      <BuildingHeading title={title} />
      <BuildingPhoto image={parallaxImage} />
      <BuildingPoints points={points} />
      <BuildingBenefits {...benefits} />
      <BuildingPreparation {...preparation} />
      <BuildingGallery images={gallery} />
      <Outro />
    </>
  )
}

Building.layoutConfig = {
  HeaderAdaptiveTransparency: false,
}

export default Building
