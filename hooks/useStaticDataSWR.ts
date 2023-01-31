import { useRouter } from "next/router"
import useSWR from "swr"
import { StaticFetchSanitized } from "types"
import baseUrl from "api/baseUrl"
import { fetchStatic } from "api/fetchStatic"

export const useStaticDataSWR = () => {
  const { locale = "en" } = useRouter()
  const { data } = useSWR<StaticFetchSanitized>(
    [`${baseUrl}/api/statics`, locale],
    () => fetchStatic(locale)
  )
  return data
}
