import type { NextPage } from 'next'
import Head from 'next/head'
import {GetStaticProps} from 'next';
import {loadAllData} from '../api/notion';
import Main from './Main';
import {StaticProps} from '../../types/main.types'

const Home: NextPage<StaticProps> = (props) => {
  return (
    <div className="h-screen bg-gray-300">
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
    
    return {
        props:{
            ...data
        }
    };
}

export default Home