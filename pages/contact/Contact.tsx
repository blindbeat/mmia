import { NextPageWithLayoutConfig } from "pages/_app"
import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  MarkerProps,
} from "react-simple-maps"
import map from "assets/maps/world.json"
import styles from "./Contact.module.css"
// @ts-ignore
import { geoAitoff } from "d3-geo-projection"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { createPortal } from "react-dom"
import Image from "next/image"
import projectImage from "assets/dummyPics/instagramPhotos/1.jpg"

const projection = geoAitoff().scale(220).center([45, 30])
const points: [number, number][] = [
  [30.006, 50.7128],
  [10, 20],
  [20, 40],
  [-90, 42],
  [90, 25],
  [140.033484, 35.788226],
  [150.98, -34.07],
  [-73.959089, 40.627087],
]

const Contact: NextPageWithLayoutConfig = () => {
  const [mapElemState, setMapElemState] = useState<HTMLDivElement | null>(null)
  const mapElem = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMapElemState(mapElem.current as HTMLDivElement)
  }, [])

  return (
    <div className={styles.content} ref={mapElem} id="map">
      <ComposableMap
        projection={projection}
        // projectionConfig={{
        //   center: [0, 25],
        //   scale: 180,
        // }}
        className={styles.map}
      >
        <Geographies geography={map}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#292929"
                stroke="rgba(23, 23, 23, 1)"
                strokeWidth="0.75px"
              />
            ))
          }
        </Geographies>
        {mapElemState &&
          points.map((point, index) => (
            <MarkerAnimated
              portalTarget={mapElemState}
              delay={index / 1.5}
              key={point.join()}
              coordinates={point}
            />
          ))}
      </ComposableMap>
    </div>
  )
}

Contact.layoutConfig = {
  showFooter: false,
  headerMargin: null,
}
export default Contact

interface MarkerAnimatedProps extends MarkerProps {
  delay: number
  portalTarget: HTMLDivElement
}

const MarkerAnimated = ({
  delay,
  portalTarget,
  ...rest
}: MarkerAnimatedProps) => {
  const [hovered, setHovered] = useState(false)
  const [position, setPosition] = useState<[number, number] | null>(null)
  const markerRef = useRef<null | SVGPathElement>(null)

  const positionSetter = useCallback(() => {
    const elem = markerRef.current
    const parentElem = elem?.closest(`.${styles.content}`)
    if (!elem || !parentElem) return
    const rect = elem.getBoundingClientRect()
    const parentRect = parentElem.getBoundingClientRect()
    const x = rect.x + rect.width / 2 - parentRect.x
    const y = rect.y + rect.height / 2 - parentRect.y
    setPosition([x, y])
  }, [])

  useEffect(() => {
    positionSetter()
    window.addEventListener("resize", positionSetter)
    return () => {
      window.removeEventListener("resize", positionSetter)
    }
  }, [positionSetter])

  return (
    <>
      {portalTarget &&
        position &&
        createPortal(
          <Link
            key={position.join("-")}
            href="/projects/projectName"
            style={{
              top: position[1],
              left: position[0],
              transform: `translate(-50%, -50%)`,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={styles.clickCather}
          >
            <AnimatePresence>
              {hovered && (
                <motion.div className={styles.animatedElementsWrapper}>
                  <motion.div
                    initial={{ y: `100%`, opacity: 0 }}
                    animate={{
                      y: `0%`,
                      opacity: 1,
                    }}
                    exit={{
                      y: `100%`,
                      opacity: 0,
                      transition: {
                        ease: "circIn",
                        duration: 0.3,
                      },
                    }}
                    transition={{
                      ease: "circOut",
                      duration: 0.6,
                    }}
                    className={styles.imageWrapper}
                  >
                    <Image src={projectImage} alt="" className={styles.image} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>,
          portalTarget
        )}
      <Marker {...rest} ref={markerRef} className={styles.marker}>
        <motion.circle
          initial={{
            fill: "#292929",
            r: 2,
            opacity: 0,
          }}
          animate={{
            opacity: [null, 1, 1],
            fill: [null, "#aaa", "#666"],
            r: [null, 3.5, 2.5],
          }}
          transition={{
            delay,
            duration: 1.5,
            type: "spring",
          }}
        />
        {[...new Array(3)].map((_, index) => (
          <motion.circle
            key={index}
            className={styles.animationCircleWave}
            animate={{
              opacity: [0, 0.6, 0.2, 0],
              fill: "white",
              r: [2.5, 2.5, 10, 35],
            }}
            transition={{
              times: [0, 0.1, 0.3, 1],
              ease: "linear",
              delay: delay + index / 1.5,
              duration: 1.5,
            }}
          />
        ))}
      </Marker>
    </>
  )
}
