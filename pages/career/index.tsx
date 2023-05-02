import { NextPageWithLayoutConfig } from "pages/_app"
import CareerVacancies from "modules/career/CareerVacancies"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  locale ||= "en"
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "building"])),
    },
  }
}
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
