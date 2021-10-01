import {Tab} from '@headlessui/react';
import React from 'react'
import {NotionCard} from '../../types/notion.types'
import {SlideFromTop} from '../../components/hoc/SlidesAnimation' 
import TabPanel from './TabPanel'

interface CustomTabsProps{
    recent:Array<NotionCard>,
    frontend:Array<NotionCard>,
    ml:Array<NotionCard>,
    algo:Array<NotionCard>
}

function createClasses(...classes:string[]){
    return classes.join(' ');
}

const CustomTabs:React.FC<CustomTabsProps>=({recent,frontend,ml,algo})=>{
    const createTab=(tabname:String)=>{
        return (
        <Tab as={'div'} className={(selected)=>createClasses(
        "text-center leading-4 transition-all flex-grow p-2 bg-blue-400 rounded-xl font-normal text-white",
        selected?"focus:ring-2 ring-offset-1 ring-green-600":"")
        }>{tabname}</Tab>
        )
    }

    const getPanel=(data:Array<NotionCard>)=>{
        return data.map((curr)=>{
        })
    }

    return (
        <SlideFromTop >
            <div className="w-full mt-5 md:mt-7">
                <Tab.Group defaultIndex={0}>
                    <Tab.List as={'div'} className="flex justify-center w-full gap-4">
                        {createTab('Recents')}
                        {createTab('Web ')}
                        {createTab('Machine Learning')}
                        {createTab('Algorithms')}
                    </Tab.List>
                    <Tab.Panels>
                        <TabPanel data={recent}/>
                        <TabPanel data={frontend}/>
                        <TabPanel data={ml}/>
                        <TabPanel data={algo}/>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </SlideFromTop>
    )
}

export default CustomTabs;
