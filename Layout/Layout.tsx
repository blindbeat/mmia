import { ReactNode } from "react"
import Header from "./Header"
import Footer from "./Footer"
import styles from "./Layout.module.css"
import classNames from "classnames"

export interface LayoutConfig {
  adaptiveHeaderTransparency: boolean
  showFooter: boolean
  headerMargin: null | undefined | string
}

interface Props {
  children: ReactNode
  config?: Partial<LayoutConfig>
}

function Layout({
  children,
  config: {
    showFooter = true,
    adaptiveHeaderTransparency = true,
    headerMargin,
  } = {},
}: Props) {
  return (
    <>
      <Header adaptiveTransparency={adaptiveHeaderTransparency} />
      <main
        className={classNames(
          styles.content,
          headerMargin === undefined && styles.defaultPaddingTop
        )}
        style={{
          paddingTop: headerMargin ?? undefined,
        }}
      >
        {children}
      </main>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout
