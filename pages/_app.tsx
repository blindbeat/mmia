import "normalize.css/normalize.css"
import "styles/globals.css"
import "styles/fonts.css"
import "styles/breakponts.css"
import "styles/utils.module.css"
import "swiper/css"
import type { AppProps } from "next/app"
import Layout from "Layout"
import { NextPage } from "next"
import { LayoutConfig } from "Layout/Layout"

export type NextPageWithLayoutConfig<P = {}, IP = P> = NextPage<P, IP> & {
  layoutConfig?: Partial<LayoutConfig>
}

interface AppPropsWithLayoutConfig extends AppProps {
  Component: NextPageWithLayoutConfig
}

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayoutConfig) {
  return (
    <Layout config={Component.layoutConfig}>
      <Component {...pageProps} />
    </Layout>
  )
}
