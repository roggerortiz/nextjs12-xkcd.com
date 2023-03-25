import { Masonry } from "masonic";
import { readdir, readFile } from 'node:fs/promises'
import Layout from 'components/Layout'
import ComicCard from 'components/ComicCard'
import { Text } from "@nextui-org/react";

export default function Home({ comics }) {
  return (
    <Layout
      title="Home"
      description="Comics for developers"
    >
      <Text h2>
        Latest Comics
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