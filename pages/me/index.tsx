import type { NextPage } from 'next'
import Head from 'next/head'
import {GetStaticProps} from 'next';
import {loadAllData} from '../api/notion';
import Main from './Main';
import {StaticProps} from '../../types/main.types'

const Home: NextPage<StaticProps> = (props) => {
  return (
    <div className="min-h-screen bg-blue-200">
      <Head>
        <title>Sasank Thapa</title>
        <meta name="Sasank Thapa" content="Work by Sasank, About, Sasank" />
        <link rel="icon" href="/favicon.ico" />
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
