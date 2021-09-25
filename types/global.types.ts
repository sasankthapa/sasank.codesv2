type NotionCard={
    name:string,
    emoji:string,
    info:Array<string>
}

interface StaticProps{
    recent:Array<NotionCard>,
    frontend:Array<NotionCard>,
    ml:Array<NotionCard>
}
