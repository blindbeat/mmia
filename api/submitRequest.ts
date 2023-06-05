import { Inputs } from "modules/blocks/RequestModal/RequestModal"
import baseUrl from "api/baseUrl"

const url = new URL(`api/request`, baseUrl)

export const submitRequest = async (data: Inputs) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  })
  // if (!response.ok) throw new Error("form error")
  return response.ok
}
