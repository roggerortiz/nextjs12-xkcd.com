import { useRouter } from "next/router"
import { createContext, useCallback, useContext } from "react"
import en from 'transalations/en.json'
import es from 'transalations/es.json'

const I18NContext = createContext()

const languages = { en, es }

export function I18NProvider({ children }) {
  const { locale } = useRouter()

  const translate = useCallback((key, ...args) => {
    let translation = languages[locale][key]
    if (!Boolean(args.length)) return translation

    args.forEach((value, index) => {
      translation = translation.replace(`\${${index + 1}}`, value)
    })

    return translation
  }, [locale])

  return (
    <I18NContext.Provider value={{ translate }}>
      {children}
    </I18NContext.Provider>
  )
}

export function useI18N() {
  const context = useContext(I18NContext)

  if (context === undefined) {
    throw new Error("useI18N must be used within a I18NProvider")
  }

  return context
}