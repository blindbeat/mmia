import { NextPageWithLayoutConfig } from "pages/_app"
import { MediaHeading } from "modules/media/MediaHeading"
import { MediaCards } from "modules/media/MediaCards"
import { MediaEntry, Media } from "types"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { fetchMedia } from "api/fetchMedia"

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
  locale ||= "en"
  const media = await fetchMedia(locale)
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "building"])),
      ...media,
    },
  }
}

interface Props {
  title: string
  description: string
  media: MediaEntry[]
}
const Media: NextPageWithLayoutConfig<Media> = ({
  title,
  description,
  media,
}) => {
  return (
    <>
      <MediaHeading title={title} description={description} />
      <MediaCards mediaArr={media} />
    </>
  )
}

Media.layoutConfig = {
  HeaderAdaptiveTransparency: false,
}

export default Media
