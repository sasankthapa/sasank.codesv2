//Renderers
type rawPoint=THREE.Vector2;
type rawPoints=Array<THREE.Vector2>;
type point={index:string,data:THREE.Vector2,color:number};
type points={index:string,data:Array<THREE.Vector2>,color:number};

export interface PointsRendererProps{
    pointData:Array<point>,
    pointsData:Array<points>
}

export interface LineRendererProps{
    lineData?:Array<[THREE.Vector2,THREE.Vector2]>, //line segment
    linesData:Array<points> //multple line segments
}

export interface AlgorithmDisplayProps{
    step:()=>void

}

export interface EuclidProps extends CustomCanvasProps{
    hull:Array<THREE.Vector2>
}

export interface IStack<T>{
    push(item:T):void,
    pop():T|undefined,
    peek():T|undefined,
    size():number
}

export interface IGrahamScan{
    display:{
        points:points|undefined,
        hull:points|undefined,
        start:point|undefined,
        mid:point|undefined,
        end:point|undefined,
    },
    stack:IStack<rawPoint>,
    findLowestY():rawPoint,
    sortPoints():void,
    validatePoint():boolean,
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
