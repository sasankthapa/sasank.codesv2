import {Block, ChildPageBlock} from '@notionhq/client/build/src/api-types'
import React from 'react'

interface NotionPage{
    type:string,
}

type NotionContentGraph= {[key:string]:NotionPage}|NotionContentGraph[]

interface BodyProps{
    map:{[key:string]:NotionPage|}
}

const Body:React.FC<BodyProps>=()=>{
    return <div>
    </div>
}

export default Body;
