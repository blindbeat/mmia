import Info from "modules/info"
import { GetServerSideProps } from "next"
import { InfoData } from "types"
import { fetchInfo } from "api/fetchInfo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getServerSideProps: GetServerSideProps<InfoData> = async ({
  locale,
}) => {
  locale ||= "en"
  const terms = await fetchInfo("terms", locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ...terms,
    },
  }
}

const Terms = (props: InfoData) => {
  return <Info {...props} />
}

Terms.layoutConfig = {
  HeaderAdaptiveTransparency: false,
  showFooter: false,
}

export default Terms
