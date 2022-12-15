import Error from "modules/error"
import { NextPageWithLayoutConfig } from "pages/_app"

const Error404: NextPageWithLayoutConfig = () => {
  return <Error>page not found (404)</Error>
}

Error404.layoutConfig = {
  showHeader: false,
  showFooter: false,
  headerMargin: null,
}

export default Error404
