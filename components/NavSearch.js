import { useState } from "react";
import { Search } from "react-iconly";
import { useRouter } from "next/router";
import { Col, Container, Input, Link, Navbar, Row, styled, Text } from "@nextui-org/react";

const Ul = styled("ul", {
  margin: '0',
  padding: '0',
  borderRadius: "var(--nextui-space-6)",
  border: '1px solid var(--nextui-colors-border)',
  backgroundColor: 'var(--nextui-colors-backgroundContrast)'
});

const Li = styled("li", {
  padding: '0.3rem 0.75rem',
  '&:hover': {
    backgroundColor: "$gray300"
  },
  '&:first-child': {
    borderTopRightRadius: 'inherit',
    borderTopLeftRadius: 'inherit'
  },
  '&:last-child': {
    paddingBottom: '0.5rem',
    borderBottomRightRadius: 'inherit',
    borderBottomLeftRadius: 'inherit'
  }
});

export function NavSearch() {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])

  const handleChange = (event) => {
    const q = event.target.value ?? ''

    if (!q.trim()) return

    setSearch(q)

    fetch(`/api/search?q=${q}`)
      .then(res => res.json())
      .then(data => setResults(data))
  }

  const handleClear = () => {
    setSearch('')
    setResults([])
  }

  const handleViewAll = (event) => {
    event.preventDefault()

    setSearch('')
    setResults([])
    router.push(`/search?q=${search}`)
  }

  const handleViewItem = (id) => (event) => {
    event.preventDefault()

    setSearch('')
    setResults([])
    router.push(`/comic/${id}`)
  }

  return (
    <Navbar.Item>
      <div>
        <Input
          clearable
          bordered
          value={search}
          aria-label="Search"
          placeholder="Search..."
          contentLeftStyling={false}
          contentLeft={<Search set="light" size="small" />}
          onClearClick={handleClear}
          css={{
            w: "100%",
            "@xsMax": {
              mw: "300px",
            },
            "& .nextui-input-content--left": {
              h: "100%",
              ml: "$4",
              dflex: "center",
            },
          }}
          onChange={handleChange}
        />

        {Boolean(results.length) && (
          <Container
            css={{
              position: "absolute",
              top: "60px",
              right: "0",
              padding: "0",
            }}
          >
            <Ul>
              <Li css={{
                textAlign: 'center',
                borderBottom: '1px solid var(--nextui-colors-border)',
              }}>
                <Link
                  href="#"
                  onClick={handleViewAll}
                  css={{
                    fontSize: "$sm"
                  }}
                >
                  View {results.length} {results.length > 1 ? 'results' : 'result'}
                </Link>
              </Li>

              {results.map(result => (
                <Li key={result.id}>
                  <a
                    href="#"
                    onClick={handleViewItem(result.id)}
                  >
                    <Row align="center">
                      <Col span={2}>
                        <Search
                          set="light"
                          size="small"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        />
                      </Col>
                      <Col span={10}>
                        <Text
                          size="$sm"
                          css={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap"
                          }}
                        >
                          {result.title}
                        </Text>
                      </Col>
                    </Row>
                  </a>
                </Li>
              ))}
            </Ul>
          </Container>
        )}
      </div>
    </Navbar.Item>
  )
}