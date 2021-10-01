import React from 'react'
import {Tab} from '@headlessui/react';
import {NotionCard} from '../../types/notion.types'

interface TabPanelProps{
    data:Array<NotionCard>
}

const TabPanel:React.FC<TabPanelProps> = ({data}) => {
    console.log(data);
    return <Tab.Panel><ul>{data?data.map((curr,index)=>{
        return <li
            key={curr.name[0]+index}
            className="relative p-3 rounded-md hover:bg-coolGray-100"
            >
             <h3 className="text-sm font-medium leading-5">
                {curr.name}
             </h3>
             {curr.info.map((_info,index)=>{
                 return <p key={_info[0]+index}>{_info}</p>
             })}
        </li>
    }):null}</ul></Tab.Panel>
}

export default TabPanel;
