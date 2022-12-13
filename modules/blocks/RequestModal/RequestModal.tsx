import styles from "./RequestModal.module.css"
import {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
} from "react"
import { TextField, ThemeProvider } from "@mui/material"
import { theme } from "utils/theme"
import { ComponentWithLineAdornment } from "components"
import { motion } from "framer-motion"
import { RequestOpenerContext } from "contexts"
import Cross from "./assets/cross.svg"

const RequestModal = () => {
  const requestWindowRef = useRef<HTMLDivElement>(null)
  const setIsRequestModalOpen = useContext(RequestOpenerContext) as Dispatch<
    SetStateAction<boolean>
  >

  useEffect(() => {
    const body = document.body
    body.style.height = `100vh`
    body.style.overflowY = "hidden"

    return () => {
      body.style.height = ""
      body.style.overflowY = ""
    }
  }, [])
  const closeModal = () => setIsRequestModalOpen(false)
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !(requestWindowRef.current as HTMLDivElement).contains(
        e.target as HTMLElement
      )
    )
      closeModal()
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("hello")
  }

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={styles.wrapper}
        onMouseDown={handleClick}
      >
        <div ref={requestWindowRef} className={styles.requestWindow}>
          <div className={styles.requestWindowContent}>
            <h4 className={styles.header}>Let's discuss your questions</h4>
            <p className={styles.paragraph}>
              Our team of specialists will contact you at the specified email
              address within 24 business hours
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formLinks}>
                <TextField label="name" autoComplete="name" />
                <TextField label="email" type="email" />
                <TextField
                  label="message"
                  className={styles.message}
                  multiline
                  maxRows={10}
                />
              </div>

              <ComponentWithLineAdornment
                as="button"
                onClick={() => console.log()}
              >
                drop request
              </ComponentWithLineAdornment>
            </form>
          </div>
          <button className={styles.crossButton} onClick={closeModal}>
            <Cross />
          </button>
        </div>
      </motion.div>
    </ThemeProvider>
  )
}

export default RequestModal
