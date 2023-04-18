import "normalize.css/normalize.css"
import "styles/globals.css"
import "styles/breakponts.css"
import "styles/utils.module.css"
import "swiper/css"
import type { AppProps } from "next/app"
import Layout from "Layout"
import { NextPage } from "next"
import { LayoutConfig } from "Layout/Layout"
import localFont from "next/font/local"
import Head from "next/head"
import { appWithTranslation } from 'next-i18next'

const Helvetica = localFont({
  src: [
    {
      path: "../assets/fonts/Helvetica/Helvetica-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/Helvetica/Helvetica.woff2",
      weight: "400",
      style: "normal",
    },
  ],
})

export type NextPageWithLayoutConfig<P = {}, IP = P> = NextPage<P, IP> & {
  layoutConfig?: Partial<LayoutConfig>
}

interface AppPropsWithLayoutConfig extends AppProps {
  Component: NextPageWithLayoutConfig
}

function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayoutConfig) {
  return (
    <>
      <Head>
        <title>MMIA</title>
      </Head>
      <Layout config={Component.layoutConfig} className={Helvetica.className}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default appWithTranslation(MyApp)