interface ContentObject{
    github?:string,
    content?:string[]
}

interface NotionPage{
    title:string,
    children:NotionPage[]
}

type recursiveReturn=ContentObject|NotionPage;
