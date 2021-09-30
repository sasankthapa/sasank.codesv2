import React, {useState} from 'react'
import {SlideFromRight} from './hoc/SlidesAnimation';
import {NotionCard} from '../types/notion.types'

interface NotionCardProps{
    data:NotionCard,
    delay:number
}
const NotionCards:React.FC<NotionCardProps>=({data,delay})=>{
    const [active,setActive] =useState(false);

    return <SlideFromRight delay={delay*500}>
        <div onClick={()=>setActive(prev=>!prev)} className="p-5 bg-blue-200 shadow-lg cursor-pointer rounded-md">
            <h1>{data.name}</h1>
        </div>
    </SlideFromRight>
}

export default NotionCards
