import type { NextPage } from 'next'
import Head from 'next/head'
import MainContainer from './MainContainer'

const Home: NextPage<{}> = () => {
  return (
    <div>
      <Head>
        <title>Sasank Thapa</title>
        <meta name="Sasank Thapa Portfolio Links" content="Links" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <MainContainer />
    </div>
  )
}

export default Home
