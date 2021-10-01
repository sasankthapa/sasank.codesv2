import React from 'react'
import {Tab} from '@headlessui/react';
import {NotionCard} from '../types/notion.types'
import Link from 'next/link'
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
             <h3 className="inline font-medium 2xl:text-lg">
                {curr.name}
                {curr.github?
                    <Link href={curr.github}><a target="_blank" rel="noreferrer"><FaGithub className="float-right w-4 h-4"/></a></Link>
                :null}
             </h3>
             <ul className="text-sm list-disc ml-7 xl:text-base">
             {curr.info.map((_info,index)=>{
                 return <li key={_info[0]+index}>{_info}</li>
             })}
             </ul>
        </li>
    }):null}</ul></Tab.Panel>
}

export default TabPanel;
