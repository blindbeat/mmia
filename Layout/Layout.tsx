import { ComponentPropsWithoutRef } from "react"
import Navigation from "../modules/blocks/Navigation"
import Footer from "../modules/blocks/Footer"
import styles from "./Layout.module.css"
import classNames from "classnames"

export interface LayoutConfig {
  adaptiveHeaderTransparency: boolean
  adaptiveHeaderHiding: boolean | number
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
    adaptiveHeaderHiding = true,
    headerMargin,
  } = {},
}: Props) {
  // let mainPaddingTop
  // switch (headerMargin) {
  //   case null: {
  //     mainPaddingTop = undefined
  //     break
  //   }
  //   case undefined: {
  //     mainPaddingTop = `calc(${headerHeight}px + ${headerMargin})`
  //     break
  //   }
  //   default: {
  //     mainPaddingTop = `calc(${headerHeight}px + var(--5xl))`
  //   }
  // }
  return (
    <>
      <Navigation
        adaptiveTransparency={adaptiveHeaderTransparency}
        adaptiveHiding={adaptiveHeaderHiding}
      />
      <div
        className={classNames(
          headerMargin !== null && styles.headerHeightPadding
        )}
      >
        <main
          className={classNames(
            styles.content,
            headerMargin !== null && styles.defaultMainPadding,
            className
          )}
          style={{
            paddingTop: headerMargin ?? undefined,
          }}
        >
          {children}
        </main>
      </div>
      {showFooter && <Footer />}
    </>
  )
}

export default Layout
