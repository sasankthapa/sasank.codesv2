import { Client } from "@notionhq/client"
import {PagesRetrieveResponse} from "@notionhq/client/build/src/api-endpoints";
import {Block, ChildPageBlock, Page, RichText} from "@notionhq/client/build/src/api-types";

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

const getPagesList=async(pageID:string)=>{
    return (await getBlockChildren(pageID)).results
}

const getPageBlocks=async(pageID:string)=>{
    const blockListObject=await getAllBlocks(pageID);
    return blockListObject.results;
}

type notionDisplayObject={
    name?:string,
    emoji?:string,
    github?:string,
    link?:string,
    info?:Array<string>
}

const createObject=(page:PagesRetrieveResponse,blockListObject:Block[])=>{
    const toReturn:notionDisplayObject={
        info:[]
    }
    if(page.properties.title.type==='title')
        toReturn['name']=page.properties.title.title[0].plain_text
    if(page.icon && page.icon.type==='emoji'){
        toReturn['emoji']=page.icon.emoji
    }
    for(var i=0;i <blockListObject.length;i++){
        const currentBlock=blockListObject[i];
        switch(currentBlock.type){
            case 'paragraph':
                let [linkName,link]=currentBlock.paragraph.text.toString().split(':')
                if(linkName.trim()==='github'){
                    toReturn['github']=link;
                }else if(linkName.trim()==='link'){
                     toReturn['link']=link;
                }
                break;
            case 'bulleted_list_item':
                toReturn['info']?.push(currentBlock.bulleted_list_item.text[0]?.plain_text)
        }
    }
    return toReturn
}

const getPageInfo=async(pageId:string)=>{
    const page=await getPage(pageId);
    if(page)
        return page
    return '';
}

const loadPageData=async(page:string|undefined)=>{
    if(page===undefined) return []
    const pages=await getPagesList(page)
    const mapArr=[]
    for(var i=0;i < pages.length;i++){
        const pageId:string=pages[i].id;
        const pageInfo=await getPageInfo(pageId)
        if(pageInfo!=="")
            mapArr.push(createObject(pageInfo,await getPageBlocks(pages[i].id)))
    }
    return mapArr;
}

export const loadAllData=async()=>{
    return {
        recent:await loadPageData(process.env.PAGE_RECENT),
        frontend:await loadPageData(process.env.PAGE_FRONTEND),
        ml:await loadPageData(process.env.PAGE_ML),
        algo:await loadPageData(process.env.PAGE_ALGO)
    }
}
