import { ComponentPropsWithoutRef } from "react"
import Header from "../modules/blocks/Header"
import Footer from "../modules/blocks/Footer"
import styles from "./Layout.module.css"
import classNames from "classnames"

export interface LayoutConfig {
  adaptiveHeaderTransparency: boolean
  showFooter: boolean
  headerMargin: null | undefined | string
}

interface Props extends ComponentPropsWithoutRef<"main"> {
  config?: Partial<LayoutConfig>
}

function Layout({
  children,
  className,
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
          headerMargin === undefined && styles.defaultPaddingTop,
          className
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
