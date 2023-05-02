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
import { Contact, ProjectWithCoordsBrief } from "types"
import Socials from "modules/blocks/Socials"
import { GetServerSideProps } from "next"
import { fetchContacts } from "api/fetchContacts"
import { fetchProjects } from "api"
import { convertToPhone } from "utils/convertToPhone"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const projection = geoAitoff().scale(200).center([45, 25])

interface Props {
  contacts: Contact[]
  projects: ProjectWithCoordsBrief[]
}

export const getServerSideProps: GetServerSideProps<Props> = async ({
  locale,
}) => {
  locale ||= "en"
  const contacts = (await fetchContacts(locale)).contacts
  const projects = (await fetchProjects(locale)).data.filter(
    (project): project is ProjectWithCoordsBrief => {
      return "lat" in project && "lng" in project
    }
  )

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      contacts,
      projects,
    },
  }
}

const Contact: NextPageWithLayoutConfig<Props> = ({ projects, contacts }) => {
  const [mapElemState, setMapElemState] = useState<HTMLDivElement | null>(null)
  const mapElem = useRef<HTMLDivElement | null>(null)
  const [lastWaveEnded, setLastWaveEnded] = useState(false)
  const [waveTriggeringCountingArray, setWaveTriggeringCountingArray] =
    useState([...new Array(projects.length).fill(0)])

  useEffect(() => {
    setMapElemState(mapElem.current as HTMLDivElement)
  }, [])

  const lastIndexAnimated = useRef<null | number>(null)

  const increaseRandomAnimationIndex = useCallback(() => {
    let randomIndexInArray = Math.floor(Math.random() * projects.length)
    while (
      lastIndexAnimated.current !== null &&
      lastIndexAnimated.current == randomIndexInArray
    ) {
      randomIndexInArray = Math.floor(Math.random() * projects.length)
    }

    lastIndexAnimated.current = randomIndexInArray

    setWaveTriggeringCountingArray((state) => {
      const newState = [...state]
      newState[randomIndexInArray] = state[randomIndexInArray] + 1
      return newState
    })
  }, [projects.length])

  useEffect(() => {
    if (!lastWaveEnded || projects.length < 3) return
    increaseRandomAnimationIndex()
    const interval = setInterval(increaseRandomAnimationIndex, 1000)
    return () => clearInterval(interval)
  }, [increaseRandomAnimationIndex, lastWaveEnded, projects.length])

  return (
    <div className={styles.content} ref={mapElem} id="map">
      <ComposableMap projection={projection} className={styles.map}>
        <Geographies geography={map} style={{ width: `100%` }}>
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
          projects.map((project, index) => (
            <MarkerAnimated
              key={index}
              delay={index / 5}
              project={project}
              portalTarget={mapElemState}
              animationTriggeringNumber={waveTriggeringCountingArray[index]}
              setLastWaveEnded={
                index === projects.length - 1 ? setLastWaveEnded : undefined
              }
            />
          ))}
      </ComposableMap>
      <div className={styles.text}>
        <div className={styles.contacts}>
          {contacts.map((contact, index) => (
            <div key={index} className={styles.contact}>
              <h5>{contact.city}</h5>
              <p>{contact.address}</p>
              <motion.a
                initial={false}
                animate={{
                  opacity: 0.7,
                }}
                whileHover={{
                  opacity: 1,
                }}
                href={`tel:+${convertToPhone(contact.phone)}`}
              >
                {contact.phone}
              </motion.a>
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <motion.a
            className={styles.email}
            initial={false}
            animate={{
              opacity: 0.7,
            }}
            whileHover={{
              opacity: 1,
            }}
            href="Info@aimm-group.com"
          >
            Info@aimm-group.com
          </motion.a>
          <Socials />
        </div>
      </div>
    </div>
  )
}

Contact.layoutConfig = {
  showFooter: false,
  headerMargin: null,
}
export default Contact

interface MarkerAnimatedProps extends MarkerProps {
  project: ProjectWithCoordsBrief
  delay: number
  portalTarget: HTMLDivElement
  animationTriggeringNumber: number
  setLastWaveEnded?: (isEnded: boolean) => void
}

const MarkerAnimated = ({
  delay,
  portalTarget,
  animationTriggeringNumber,
  setLastWaveEnded,
  project,
  ...rest
}: MarkerAnimatedProps) => {
  const [hovered, setHovered] = useState(false)
  const [position, setPosition] = useState<[number, number] | null>(null)
  const markerRef = useRef<null | SVGPathElement>(null)
  const [animationComplete, setAnimationComplete] = useState(false)

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
            href={`/projects/${project.slug}`}
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
                  <svg
                    viewBox="0 0 85 118"
                    className={styles.svgLines}
                    preserveAspectRatio="none"
                  >
                    Mask is the only option to animate line drawing with dashes.
                    <defs>
                      <clipPath id="cut-off-bottom">
                        {[
                          [...new Array(7)].map((_, index) => (
                            <rect
                              key={index}
                              x={10 + index * 10}
                              y={0}
                              width={5}
                              height={118}
                            />
                          )),
                        ]}
                        {[
                          [...new Array(10)].map((_, index) => (
                            <rect
                              key={index}
                              x={0}
                              y={8 + index * 10.8}
                              width={85}
                              height={5.2}
                            />
                          )),
                        ]}
                      </clipPath>
                    </defs>
                    <motion.path
                      initial={{
                        stroke: "rgba(23, 23, 23, 0)",
                        d: "M 42.5 118 L 38 113 L 5 113 L 5 113 L 80 113 L 80 113 L 47 113 L 42.5 118 Z",
                      }}
                      animate={{
                        stroke: "rgba(23, 23, 23, 1)",
                        d: "M 42.5 118 L 38 113 L 5 113 L 5 5 L 80 5 L 80 113 L 47 113 L 42.5 118 Z",
                      }}
                      exit={{
                        stroke: "rgba(23, 23, 23, 0)",
                        d: "M 42.5 113 L 38 113 L 5 113 L 5 113 L 80 113 L 80 113 L 47 113 L 42.5 113 Z",
                        transition: {
                          ease: [0.67, 0.2, 0.15, 0.99],
                          duration: 0.6,
                        },
                      }}
                      fill="rgba(23, 23, 23, 1)"
                      transition={{
                        ease: [0.67, 0.2, 0.15, 0.99],
                        duration: 0.8,
                      }}
                      strokeWidth="1px"
                      stroke="rgba(23, 23, 23, 1)"
                    />
                    {[
                      "M 42.5 118 L 38 113 L 5 113 L 5 5 L 44 5",
                      "M 42.5 118 L 47 113 L 80 113 L 80 5 L 41 5",
                    ].map((path) => (
                      <motion.path
                        key={path}
                        initial={{
                          pathLength: 0,
                        }}
                        animate={{
                          pathLength: 1,
                        }}
                        exit={{
                          pathLength: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.67, 0.2, 0.15, 0.99],
                          },
                        }}
                        stroke="rgb(162,162,162)"
                        strokeWidth={0.75}
                        transition={{
                          duration: 1,
                          ease: [0.67, 0.2, 0.15, 0.99],
                        }}
                        fill="none"
                        d={path}
                        clipPath="url(#cut-off-bottom)"
                      />
                    ))}
                  </svg>
                  <div className={styles.imageClipper}>
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
                          ease: [0.67, 0.2, 0.15, 0.99],
                          duration: 0.6,
                        },
                      }}
                      transition={{
                        ease: [0.67, 0.2, 0.15, 0.99],
                        duration: 0.8,
                      }}
                      className={styles.imageWrapper}
                    >
                      <Image
                        src={project.image}
                        fill
                        sizes={`${(7 / (28 / 43)) * (16 / 9)}rem`}
                        alt=""
                        className={styles.image}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>,
          portalTarget
        )}
      <Marker
        {...rest}
        coordinates={[+project.lng, +project.lat]}
        ref={markerRef}
        className={styles.marker}
      >
        <motion.circle
          initial={{
            r: 2,
            opacity: 0,
            fill: "#292929",
          }}
          animate={{
            r: [null, 3.5, 2.5],
            fill: [null, "#aaa", "#666"],
            opacity: [null, 1, 1],
          }}
          onAnimationComplete={() => setAnimationComplete(true)}
          transition={{
            delay,
            duration: 1.5,
            type: ["spring", "spring", "spring"],
          }}
        />
        {/*counter used with keys to force rerendering of waves*/}
        {animationComplete &&
          [...new Array(2)].map((_, index) => (
            <motion.circle
              key={`${animationTriggeringNumber}_${index}`}
              className={styles.animationCircleWave}
              animate={{
                opacity: [0, 0.6, 0.2, 0],
                fill: "white",
                r: [2.5, 2.5, 10, 35],
              }}
              onAnimationComplete={() => {
                if (setLastWaveEnded && index === 1) setLastWaveEnded(true)
              }}
              transition={{
                times: [0, 0.1, 0.3, 1],
                ease: "linear",
                delay: index / 1.5,
                duration: 1.5,
              }}
            />
          ))}
      </Marker>
    </>
  )
}
