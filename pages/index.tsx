import type { NextPage } from 'next'
import Head from 'next/head'
import MainContainer from './MainContainer'

const Home: NextPage<{}> = () => {
  return (
    <div>
      <Head>
        <title>Sasank Thapa Portfolio</title>
        <meta name="Sasank Thapa Portfolio" content="Sasank (Sashank) Thapa" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>
      <MainContainer />
    </div>
  )
}

export default Home
