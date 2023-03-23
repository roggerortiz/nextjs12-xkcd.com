import Image from "next/image";
import Link from "next/link";
import Layout from "components/Layout";
import { readdir, readFile, stat } from 'fs/promises'
import { basename } from 'path'
import { Card, Col, Container, Row, Text } from "@nextui-org/react";

export default function Comic({ id, img, alt, title, width, height, prevId, nextId, hasPrev, hasNext }) {
  return (
    <Layout>
      <Row>
        <Col span={6} offset={3}>
          <Card >
            <Card.Header css={{ justifyContent: "center" }}>
              <Text h4 css={{ lineHeight: "$xs", margin: "0" }}>
                {title}
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Container display="flex" justify="center">
                <Image
                  src={img}
                  alt={alt}
                  width={width}
                  height={height}
                  layout="intrinsic"
                  objectFit="contain"
                />
              </Container>

              <p style={{ marginTop: "1rem" }}>
                {alt}
              </p>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="space-between">
                {hasPrev && (
                  <Link href={`/comic/${prevId}`}>
                    ⬅️ Previous
                  </Link>
                )}

                {hasNext && (
                  <Link href={`/comic/${nextId}`}>
                    Next ➡️
                  </Link>
                )}
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Layout >
  )
}

export async function getStaticPaths() {
  const files = await readdir('./comics')

  const paths = files.map(file => {
    const id = basename(file, '.json')
    return { params: { id } }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf-8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nexResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrev = prevResult.status === 'fulfilled'
  const hasNext = nexResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      prevId,
      nextId,
      hasPrev,
      hasNext
    }
  }
}