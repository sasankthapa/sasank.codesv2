import type { AppProps } from 'next/app'

function ThreeApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default ThreeApp
