import Info from "modules/info"
import { GetStaticProps } from "next"
import { InfoData } from "types"
import { fetchInfo } from "api/fetchInfo"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

export const getStaticProps: GetStaticProps<InfoData> = async ({ locale }) => {
  locale ||= "en"
  const terms = await fetchInfo("privacy", locale)

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      ...terms,
    },
  }
}

const Policy = (props: InfoData) => {
  return <Info {...props} />
}

Policy.layoutConfig = {
  HeaderAdaptiveTransparency: false,
  showFooter: false,
}

export default Policy
