import styles from "./RequestModal.module.css"
import { Dispatch, MouseEvent, SetStateAction, useContext, useRef } from "react"
import { TextField, ThemeProvider } from "@mui/material"
import { theme } from "utils/theme"
import { ComponentWithLineAdornment } from "components"
import { motion } from "framer-motion"
import { RequestOpenerContext } from "contexts"
import Cross from "assets/images/cross.svg"
import { useTranslation } from "next-i18next"
import { SubmitHandler, useForm, Controller } from "react-hook-form"
import { submitRequest } from "api/submitRequest"
import classNames from "classnames"

export interface Inputs {
  name: string
  email: string
  message: string
}
const RequestModal = () => {
  const { t } = useTranslation(["common"])
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const requestWindowRef = useRef<HTMLDivElement>(null)
  const setIsRequestModalOpen = useContext(RequestOpenerContext) as Dispatch<
    SetStateAction<boolean>
  >

  const closeModal = () => setIsRequestModalOpen(false)
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (
      !(requestWindowRef.current as HTMLDivElement).contains(
        e.target as HTMLElement
      )
    )
      closeModal()
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await submitRequest(data)
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
          {isSubmitted && (
            <div
              className={classNames(
                styles.requestWindowContent,
                styles.requestWindowContentSubmitted
              )}
            >
              <h4 className={styles.header}>
                {t("request.submitted.heading")}
              </h4>
              <p className={styles.paragraph}>{t("request.paragraph")}</p>
              <ComponentWithLineAdornment
                as="Link"
                href="/"
                onClick={closeModal}
                className={styles.button}
              >
                {t("request.submitted.button")}
              </ComponentWithLineAdornment>
            </div>
          )}
          <div
            className={classNames(
              styles.requestWindowContent,
              isSubmitted && styles.requestWindowContentHidden
            )}
          >
            <h4 className={styles.header}>{t("request.heading")}</h4>
            <p className={styles.paragraph}>{t("request.paragraph")}</p>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className={styles.formLinks}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("request.form.name.value")}
                      error={!!errors.name}
                      helperText={!!errors.name && t("request.form.name.error")}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: true,
                    pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label={t("request.form.email.value")}
                      error={!!errors.email}
                      helperText={
                        !!errors.email &&
                        (errors.email.type === "required"
                          ? t("request.form.email.error.empty")
                          : t("request.form.email.error.invalid"))
                      }
                    />
                  )}
                />
                <Controller
                  name="message"
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      label={t("request.form.message.value")}
                      maxRows={7}
                      error={!!errors.message}
                      helperText={
                        !!errors.message && t("request.form.message.error")
                      }
                      className={styles.message}
                    />
                  )}
                />
              </div>
              <ComponentWithLineAdornment
                as="button"
                disabled={isSubmitting}
                className={styles.button}
              >
                {t("request.submit")}
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
