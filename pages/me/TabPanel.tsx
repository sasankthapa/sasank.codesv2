import React from 'react'
import {Tab} from '@headlessui/react';
import {NotionCard} from '../../types/notion.types'
import {FaGithub} from 'react-icons/fa';

interface TabPanelProps{
    data:Array<NotionCard>
}

const TabPanel:React.FC<TabPanelProps> = ({data}) => {
    console.log(data);
    return <Tab.Panel className="mt-3 outline-none"><ul>{data?data.map((curr,index)=>{
        return <li
            key={curr.name[0]+index}
            className="relative p-3 mt-2 bg-gray-200 cursor-pointer rounded-md"
            >
             <h3 className="inline text-sm font-medium">
                {curr.name}
                {curr.github?<FaGithub className="float-right"/>:null}
             </h3>
             {curr.info.map((_info,index)=>{
                 return <p key={_info[0]+index}>{_info}</p>
             })}
        </li>
    }):null}</ul></Tab.Panel>
}

export default TabPanel;
