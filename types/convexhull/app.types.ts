export interface AlgorithmDisplayProps{

}

export interface EuclidProps extends CustomCanvasProps{
}

type line=[THREE.Vector2,THREE.Vector2]

export interface CustomCanvasProps{
    points:Array<THREE.Vector2>,
    lines?:Array<line>,
}

export interface IStack<T>{
    push(item:T):void,
    pop():T|undefined,
    peek():T|undefined,
    size():number
}

export interface State{
    stackArr:Array<THREE.Vector2>,
    points:Array<THREE.Vector2>,
    hull:Array<THREE.Vector2>,
    clientSide:boolean,
    width:number,
    height:number
}

export interface Props{
}
