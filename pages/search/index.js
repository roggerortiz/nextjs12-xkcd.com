import Link from "next/link"
import Image from "next/image"
import { Card, Col, Grid, Row, Text } from "@nextui-org/react"
import { Layout } from "components/Layout"
import { search } from "services/search"
import { useI18N } from "context/i18n"

export default function Search({ query, results }) {
  const { translate } = useI18N()
  const pageTitle = translate('SEARCH_RESULTS_TITLE', results.length, query)
  const pageDescription = translate('SEARCH_RESULTS_DESCRIPTION', query)

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
    >
      <Row>
        <Col span={8} offset={2}>
          <Text h2>
            {pageTitle}
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