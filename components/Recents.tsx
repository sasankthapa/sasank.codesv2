import NotionCards from './NotionCards'
import React from 'react'
import {NotionCard} from '../types/notion.types'

interface RecentProps{
    items:Array<NotionCard>
}

const Recent:React.FC<RecentProps>=({items})=>{
    return <div className="flex flex-wrap justify-center mt-2 transition-all gap-2">
        {items.map((item,index)=>{
            return (
                <NotionCards key={item.name} data={item} delay={index}/>
            )
        })}
    </div>
}

export default Recent;
