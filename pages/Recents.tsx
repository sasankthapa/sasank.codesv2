import {Block, ChildPageBlock} from '@notionhq/client/build/src/api-types'
import React from 'react'

interface RecentProps{
    items:Array<any>
}

const Recent:React.FC<RecentProps>=({items})=>{
    return <div className="flex flex-wrap">
        {items.map((item)=>{
            return (
                <div key={item.name} className="flex w-auto p-2 m-5 bg-red-300 rounded-lg">
                    {item.name}
                </div>
            )
        })}
    </div>
}

export default Recent;
