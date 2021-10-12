export interface AlgorithmDisplayProps{
    step:()=>void

}

export interface EuclidProps extends CustomCanvasProps{
    hull:Array<THREE.Vector2>
}

export interface LineRendererProps{
    lineList:Array<[THREE.Vector2,THREE.Vector2]>,
    lineColor:THREE.Color
}

export interface IStack<T>{
    push(item:T):void,
    pop():T|undefined,
    peek():T|undefined,
    size():number
}

export interface IGrahamScan{
    stack:IStack<THREE.Vector2>,
    points:Array<THREE.Vector2>,
    hull:Array<THREE.Vector2>,
    start:THREE.Vector2|undefined,
    mid:THREE.Vector2|undefined,
    end:THREE.Vector2|undefined,
}

type line=[THREE.Vector2,THREE.Vector2]

export interface CustomCanvasProps{
    points:Array<THREE.Vector2>,
    lines?:Array<line>,
}


export interface State{
    step:boolean,
    needsUpdate:boolean,
    grahamScan:IGrahamScan,
    clientSide:boolean,
    width:number,
    height:number
}

export interface Props{
}
