export interface Tag{
    tag:string,
    class:string
}

export interface CardProps{
    title:string,
    github:string,
    tags:Tag[]
}

export interface CardHolderProps{
    cards:CardProps[],
}
