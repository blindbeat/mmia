export const convertToPhone = (source: string): string => {
  const regexRes = source.match(/\d/gi)
  if (regexRes === null) return ""
  return regexRes.join("")
}
