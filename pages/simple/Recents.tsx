import {Transition} from '@headlessui/react'
import {Block, ChildPageBlock} from '@notionhq/client/build/src/api-types'
import NotionCards from '../../components/NotionCards/NotionCards'
import React from 'react'

interface RecentProps{
    items:Array<NotionCard>
}

const Recent:React.FC<RecentProps>=({items})=>{
    return <div className="flex flex-wrap">
        {items.map((item)=>{
            return (
                <NotionCards key={item.name} {...item}/>
            )
        })}
    </div>
}

export default Recent;