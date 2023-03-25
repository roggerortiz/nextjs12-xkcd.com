import { Masonry } from "masonic";
import { Text } from "@nextui-org/react";
import { readdir, readFile } from 'node:fs/promises'
import { Layout } from 'components/Layout'
import { ComicCard } from 'components/ComicCard'
import { useI18N } from "context/i18n";

export default function Home({ comics }) {
  const { translate } = useI18N()
  const pageTitle = translate('LATEST_COMICS_TITLE')
  const pageDescription = translate('LATEST_COMICS_DESCRIPTION')

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
    >
      <Text h2>
        {pageTitle}
      </Text>

      <Masonry
        items={comics}
        columnGutter={20}
        columnWidth={300}
        overscanBy={5}
        render={ComicCard}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const files = await readdir('./comics')
  const latestComicsFiles = files.slice(0, 8)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await readFile(`./comics/${file}`, 'utf-8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      comics: latestComics
    }
  }
}