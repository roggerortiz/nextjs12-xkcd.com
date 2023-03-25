import Head from 'next/head';
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { I18NProvider } from 'context/i18n';
import 'styles/globals.css'

const lightTheme = createTheme({ type: 'light' })
const darkTheme = createTheme({ type: 'dark' })

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <I18NProvider>
          <Component {...pageProps} />
        </I18NProvider>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default MyApp
