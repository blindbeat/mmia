import "normalize.css/normalize.css"
import "styles/globals.css"
import "styles/fonts.css"
import "swiper/css"
// import "swiper/css/bundle"
import type { AppProps } from "next/app"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
