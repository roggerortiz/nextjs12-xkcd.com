import { Card, Grid, Text } from '@nextui-org/react'
import { readdir, readFile } from 'fs/promises'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/Layout'

export default function Home({ comics }) {
  return (
    <Layout>
      <h2>Latest Comics</h2>

      <Grid.Container gap={2} justify="center">
        {comics.map((comic) => (
          <Grid key={comic.id} xs={4}>
            <Link href={`/comic/${comic.id}`}>
              <a style={{ width: "100%" }}>
                <Card >
                  <Card.Header css={{ justifyContent: "center" }}>
                    <Text h4 css={{ lineHeight: "$xs", margin: "0" }}>
                      {comic.title}
                    </Text>
                  </Card.Header>
                  <Card.Divider />
                  <Card.Body css={{ justifyContent: "center" }}>
                    <Image
                      src={comic.img}
                      alt={comic.alt}
                      width={300}
                      height={300}
                      layout="intrinsic"
                      objectFit="contain"
                    />
                  </Card.Body>
                </Card>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid.Container>
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