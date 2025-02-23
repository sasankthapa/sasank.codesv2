import {Tab} from '@headlessui/react';
import React from 'react'
import {NotionCard} from '../types/notion.types'
import {SlideFromTop} from './hoc/SlidesAnimation';
import TabPanel from './TabPanel'

interface CustomTabsProps{
    recent:Array<NotionCard>,
    frontend:Array<NotionCard>,
    ml:Array<NotionCard>,
    algo:Array<NotionCard>
}

function createClasses(...classes:string[]){
    console.log(classes)
    return classes.join(' ');
}

const CustomTabs:React.FC<CustomTabsProps>=({recent,frontend,ml,algo})=>{
    const createTab=(tabname:String)=>{
        return (
        <Tab className={({selected})=>createClasses(
        "text-center text-white p-2 box-border bg-green-400 rounded-md font-normal focus:ring-2 ring-offset-1 mx-1 ring-green-600",
        selected?"border-2 border-green-400":"bg-blue-400")}>{tabname}</Tab>
        )
    }

    return (
        <>
            <SlideFromTop>
                <div className="w-full mt-7">
                    <Tab.Group defaultIndex={0}>
                        <Tab.List as={'div'} className="flex text-sm xl:text-base">
                            {createTab('Recent')}
                            {createTab('Frontend')}
                            {createTab('Data Science')}
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
        </>
    )
}

export default CustomTabs;
