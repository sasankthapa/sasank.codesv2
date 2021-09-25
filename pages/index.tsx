import type { NextPage } from 'next'
import Head from 'next/head'
import {GetStaticProps} from 'next';
import {loadAllData} from './api/notion';
import Main from './Main';

const Home: NextPage<StaticProps> = (props) => {
  return (
    <div >
      <Head>
        <title>Sasank Thapa Portfolio</title>
        <meta name="Sasank Thapa Portfolio" content="Sasank (Sashank) Thapa" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

    <Main {...props}/>
    </div>
  )
}

export const getStaticProps:GetStaticProps=async()=>{
    const data=await loadAllData();
    console.log(data)
    
    return {
        props:{
            ...data
        }
    };
}

export default Home
