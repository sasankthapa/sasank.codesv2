import { Client } from "@notionhq/client"
import {ChildPageBlock} from "@notionhq/client/build/src/api-types";

console.log(process.env.NOTION_KEY)

const notion = new Client({ auth: process.env.NOTION_KEY })

const getPage=async(pageId:string)=>{
    const response = await notion.pages.retrieve({ page_id: pageId }).catch((e)=>console.log(e));
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

export const getAllBlocks=async(pageID:string)=>{
    return (await getBlockChildren(pageID))
}

const recursiveGetBlocks:(pageID:string)=>Promise<recursiveReturn|null>=async(pageID:string)=>{
    const map={};
    const page=await getPage(pageID);
    console.log(page);
    const blocksChildrenObject=await getAllBlocks(pageID);
    if(blocksChildrenObject.has_more){
        console.log('Too much data');
        return null;
    }
    const mapObject:recursiveReturn[]=[];
    blocksChildrenObject.results.forEach(async(item)=>{
        if(item.type === 'child_page'){
            const generatedNotionPages=await recursiveGetBlocks(item.id);
            if(generatedNotionPages!==null){
                mapObject.push(generatedNotionPages);
            }
        }else{

        }
    })
    return mapObject;
}

export const loadAllData=async()=>{
    let pageID='e9cc8b2ef5014aee93d126ab5d595782'
    await recursiveGetBlocks(pageID)
    const blockListObject=await getAllBlocks(pageID);
    const blockList=blockListObject.results;
    console.log(blockListObject)
    console.log(blockList)
    for(var i=0;i < blockList.length;i++){
        let curr=blockList[i] as ChildPageBlock;
        console.log(curr.child_page.title);
    }
}
