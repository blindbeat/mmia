import { NextPageWithLayoutConfig } from "pages/_app"
import React from "react"
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
import { motion } from "framer-motion"

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
  console.log(map)
  return (
    <div className={styles.content}>
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
                fill="rgba(255,255,255,0.1)"
                stroke="rgba(23, 23, 23, 1)"
                strokeWidth="0.5px"
                style={{
                  pressed: {
                    fill: "rgba(255,255,255,0.2)",
                  },
                }}
              />
            ))
          }
        </Geographies>
        {points.map((point, index) => (
          <MarkerAnimated
            delay={index}
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
}

const MarkerAnimated = ({ delay, ...rest }: MarkerAnimatedProps) => {
  return (
    <Marker {...rest}>
      <motion.circle
        initial={{
          fill: "rgba(23, 23, 23, 1)",
          r: 2,
        }}
        animate={{
          fill: ["rgba(23, 23, 23, 0)", "#aaa", "#666"],
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
          // initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.6, 0.2, 0],
            fill: "white",
            r: [2.5, 2.5, 10, 35],
          }}
          transition={{
            times: [0, 0, 0.3, 1],
            ease: "linear",
            delay: delay + index / 1.5,
            duration: 1.5,
          }}
        />
      ))}
    </Marker>
  )
}
