import { NextPageWithLayoutConfig } from "pages/_app"
import CareerVacancies from "modules/career/CareerVacancies"
import { GetServerSideProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { fetchVacancies } from "api/fetchVacancies"
import { Vacancy } from "types"

interface Props {
  vacancies: Vacancy[]
}
export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => {
  locale ||= "en"
  const vacancies = await fetchVacancies(locale)
  return {
    props: {
      vacancies,
      ...(await serverSideTranslations(locale, ["common", "career"])),
    },
  }
}
const Career: NextPageWithLayoutConfig<Props> = ({ vacancies }) => {
  return <CareerVacancies vacancies={vacancies} />
}

Career.layoutConfig = {
  HeaderAdaptiveTransparency: false,
  HeaderAdaptiveHidingBreakpoint: 1024,
  showFooter: false,
  headerMargin: "0",
}

export default Career
