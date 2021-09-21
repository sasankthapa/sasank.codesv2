import { Client } from "@notionhq/client"

const notion = new Client({ auth: process.env.NOTION_KEY })

const getPage=async(pageId:string)=>{
    const response = await notion.pages.retrieve({ page_id: pageId });
    return response
}

const getBlock=async(blockId:string)=>{
    const response= await notion.blocks.retrieve({ block_id: blockId })
    return response
}

const getBlockChildren=async(blockId:string)=>{
    const response= await notion.blocks.children.list({ block_id: blockId })
    return response
}

export const getData=()=>{
}
