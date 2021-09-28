export type NotionCard={
    name:string,
    emoji:string,
    github?:string,
    link?:string,
    info:Array<string>
}

export interface StaticProps{
    recent:Array<NotionCard>,
    frontend:Array<NotionCard>,
    ml:Array<NotionCard>
}
