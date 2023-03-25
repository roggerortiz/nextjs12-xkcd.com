import { Card, Col, Grid, Row, Text } from "@nextui-org/react"
import Layout from "components/Layout"
import Image from "next/image"
import Link from "next/link"
import { search } from "services/search"

export default function Search({ query, results }) {
  return (
    <Layout
      title={`Results for ${query}`}
      description={`Search results for ${query}`}
    >
      <Row>
        <Col span={8} offset={2}>
          <Text h2>
            {results.length} results for {query}
          </Text>

          <Grid.Container gap={2} justify="center">
            {results.map(result => (
              <Grid xs={12} key={result.id}>
                <Link href={`/comic/${result.id}`}>
                  <a style={{ width: "100%" }}>
                    <Card isPressable>
                      <Card.Header>
                        <Image
                          src={result.img}
                          alt={result.alt}
                          width={100}
                          height={100}
                          layout="intrinsic"
                          objectFit="contain"
                        />
                        <Grid.Container css={{ pl: '$8' }}>
                          <Grid xs={12}>
                            <Text h4 css={{ lineHeight: "$xs" }}>
                              {result.title}
                            </Text>
                          </Grid>
                          <Grid xs={12}>
                            <Text h4 css={{ color: "$accents8" }}>
                              {result.alt}
                            </Text>
                          </Grid>
                        </Grid.Container>
                      </Card.Header>
                    </Card>
                  </a>
                </Link>
              </Grid>
            ))}
          </Grid.Container>
        </Col>
      </Row>
    </Layout>
  )
}

export async function getServerSideProps({ query }) {
  const { q = '' } = query

  const { results } = await search({ query: q })

  return {
    props: {
      query: q,
      results
    }
  }
}