import Error from "modules/error"
import { NextPageWithLayoutConfig } from "pages/_app"

const Error500: NextPageWithLayoutConfig = () => {
  return <Error>something went wrong</Error>
}

Error500.layoutConfig = {
  showHeader: false,
  showFooter: false,
  headerMargin: null,
}

export default Error500
