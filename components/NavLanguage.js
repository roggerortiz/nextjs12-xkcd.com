import { Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";

export function NavLanguage() {
  const { locale: currentLocale, locales, push } = useRouter()

  const handleSelect = (selected) => {
    const locale = Array.from(selected)[0]
    push('/', '/', { locale })
  }

  return (
    <Dropdown
      placement="bottom-left"
      triggerType="listbox"
    >
      <Dropdown.Button
        auto
        bordered
      >
        {currentLocale}
      </Dropdown.Button>
      <Dropdown.Menu
        color="primary"
        selectionMode="single"
        disallowEmptySelection
        aria-label="Select language"
        selectedKeys={new Set([currentLocale])}
        onSelectionChange={handleSelect}
      >
        {locales.map(locale => (
          <Dropdown.Item key={locale}>
            {locale}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}