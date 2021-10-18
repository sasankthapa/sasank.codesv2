import type { NextPage } from 'next'
import Head from 'next/head'
import App from '../../components/convexhull/GrahamScanApp'
import { GrahamScan } from '../../lib/GrahamScan'

const Home: NextPage<{}> = () => {
  return (
    <div>
      <Head>
        <title>Sasank Thapa</title>
        <meta name="Sasank Thapa Portfolio Links" content="Links" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <App instance={new GrahamScan()} />
    </div>
  )
}

export default Home
