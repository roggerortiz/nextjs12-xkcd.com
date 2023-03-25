import Image from "next/image";
import { useRouter } from "next/router";
import { ChevronLeft, ChevronRight } from "react-iconly";
import { Button, Card, Col, Row, Text } from "@nextui-org/react";
import { basename } from 'node:path'
import { readdir, readFile, stat } from 'node:fs/promises'
import Layout from "components/Layout";

export default function Comic({ id, img, alt, title, width, height, prevId, nextId, hasPrev, hasNext }) {
  const router = useRouter()

  const handlePrevClick = () => router.push(`/comic/${prevId}`)
  const handleNextClick = () => router.push(`/comic/${nextId}`)

  return (
    <Layout
      title={`Comic #${id}`}
      description={`Comic #${id}: "${title}"`}
    >
      <Row>
        <Col span={8} offset={2}>
          <Card >
            <Card.Header css={{ justifyContent: "center" }}>
              <Text h4 css={{ lineHeight: "$xs", margin: "0" }}>
                {title}
              </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
              <Image
                src={img}
                alt={alt}
                width={width}
                height={height}
                layout="intrinsic"
                objectFit="contain"
              />
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Row justify="space-around">
                <Button
                  auto
                  bordered
                  color="primary"
                  disabled={!hasPrev}
                  icon={<ChevronLeft />}
                  onClick={handlePrevClick}
                >
                  Previous
                </Button>

                <Button
                  auto
                  bordered
                  color="primary"
                  disabled={true}
                >
                  #{id}
                </Button>

                <Button
                  auto
                  bordered
                  iconRight
                  color="primary"
                  disabled={!hasNext}
                  icon={<ChevronRight />}
                  onClick={handleNextClick}
                >
                  Next
                </Button>
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