import { ComponentPropsWithoutRef } from "react"
import Navigation from "../modules/blocks/Navigation"
import Footer from "../modules/blocks/Footer"
import styles from "./Layout.module.css"
import classNames from "classnames"

export interface LayoutConfig {
  showHeader: boolean
  HeaderAdaptiveTransparency: boolean
  HeaderAdaptiveHidingBreakpoint: boolean | number
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
    showHeader = true,
    showFooter = true,
    HeaderAdaptiveTransparency = true,
    HeaderAdaptiveHidingBreakpoint = true,
    headerMargin,
  } = {},
}: Props) {
  return (
    <>
      {showHeader && (
        <Navigation
          adaptiveTransparency={HeaderAdaptiveTransparency}
          adaptiveHidingBreakpoint={HeaderAdaptiveHidingBreakpoint}
        />
      )}
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
