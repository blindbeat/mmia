import { ComponentPropsWithoutRef, useEffect, useState } from "react"
import Navigation from "../modules/blocks/Navigation"
import Footer from "../modules/blocks/Footer"
import styles from "./Layout.module.css"
import classNames from "classnames"
import { FooterHeightContext, RequestOpenerContext } from "contexts"
import { AnimatePresence } from "framer-motion"
import RequestModal from "modules/blocks/RequestModal"
import FooterSocials from "modules/blocks/Footer/Socials"
import ProjectGalleryContext from "contexts/ProjectGalleryContext"

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
  const [footerHeight, setFooterHeight] = useState<number | null>(null)
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false)
  const [navIsFullscreen, setNavIsFullscreen] = useState(false)
  const [galleryState, setGalleryState] = useState<string | null>(null)

  useEffect(() => {
    const body = document.body
    if (navIsFullscreen || isRequestModalOpen || galleryState) {
      body.style.overflowY = "hidden"
    } else {
      body.style.overflowY = ""
    }
  }, [navIsFullscreen, isRequestModalOpen, galleryState])
  return (
    <RequestOpenerContext.Provider value={setIsRequestModalOpen}>
      <FooterHeightContext.Provider value={setFooterHeight}>
        <ProjectGalleryContext.Provider value={[galleryState, setGalleryState]}>
          {showHeader && (
            <Navigation
              navFullscreenSetter={setNavIsFullscreen}
              adaptiveTransparency={HeaderAdaptiveTransparency}
              adaptiveHidingBreakpoint={HeaderAdaptiveHidingBreakpoint}
            />
          )}
          <AnimatePresence>
            {isRequestModalOpen && <RequestModal />}
          </AnimatePresence>
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
                marginBottom: showFooter ? `${footerHeight}px` : undefined,
              }}
            >
              {children}
              {showFooter && <FooterSocials />}
            </main>
            {showFooter && <Footer />}
          </div>
        </ProjectGalleryContext.Provider>
      </FooterHeightContext.Provider>
    </RequestOpenerContext.Provider>
  )
}

export default Layout
