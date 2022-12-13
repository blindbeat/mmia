import "normalize.css/normalize.css"
import "styles/globals.css"
import "styles/breakponts.css"
import "styles/utils.module.css"
import "swiper/css"
import type { AppProps } from "next/app"
import Layout from "Layout"
import { NextPage } from "next"
import { LayoutConfig } from "Layout/Layout"
import localFont from "@next/font/local"
import Head from "next/head"
import RequestModal from "modules/blocks/RequestModal"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { RequestOpenerContext } from "contexts"

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

export default function MyApp({
  Component,
  pageProps,
}: AppPropsWithLayoutConfig) {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)

  return (
    <RequestOpenerContext.Provider value={setIsRequestModalOpen}>
      <Head>
        <title>MMIA</title>
      </Head>
      <Layout config={Component.layoutConfig} className={Helvetica.className}>
        <AnimatePresence>
          {isRequestModalOpen && <RequestModal />}
        </AnimatePresence>
        <Component {...pageProps} />
      </Layout>
    </RequestOpenerContext.Provider>
  )
}
