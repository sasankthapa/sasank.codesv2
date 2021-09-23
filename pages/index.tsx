import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {GetStaticProps} from 'next';
import {loadAllData} from './api/notion';
import Main from './Main';

interface HomeProps{
    recentData:Array<any>,
}

const Home: NextPage<HomeProps> = (props) => {
    console.log(props)
  return (
    <div >
      <Head>
        <title>Sasank Thapa Portfolio</title>
        <meta name="Sasank Thapa Portfolio" content="Sasank (Sashank) Thapa" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

    <Main recentData={props.recentData}/>
      <footer className={styles.footer}>
      </footer>
    </div>
  )
}

export const getStaticProps:GetStaticProps=async()=>{
    const listOfNotionItems=await loadAllData();
    console.log(listOfNotionItems)
    
    return {
        props:{
            recentData:listOfNotionItems
        }
    };
}

export default Home
