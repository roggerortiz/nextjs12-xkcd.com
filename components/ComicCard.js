import Image from "next/image";
import Link from "next/link";
import { Card, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

export function ComicCard({ data: { id, title, img, alt, width, height } }) {
  const { locale } = useRouter()

  return (
    <Link href={`/comic/${id}`}>
      <a style={{ width: "100%" }}>
        <Card>
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
        </Card>
      </a>
    </Link>
  )
}