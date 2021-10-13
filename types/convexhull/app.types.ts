//Renderers
type rawPoint=THREE.Vector2;
type rawPoints=Array<THREE.Vector2>;

type bufferTypes='point'|'points'|'line';

export type point={index?:number,type:bufferTypes,data?:rawPoint,color:number};
export type points={index?:number,type:bufferTypes,data?:rawPoints,color:number};

export interface PointsRendererProps{
    pointData:Array<point>,
    pointsData:Array<points>
}

export interface LineRendererProps{
    linesData:Array<points> //multple line segments
}

type AddNullType<T> ={
    [Property in keyof T]:T[Property]|null;
}

export interface RenderData extends PointsRendererProps, LineRendererProps {}

export interface AlgorithmDisplayProps{
    step:()=>void
}

export interface EuclidProps extends RenderData{
    planeArgs:[number,number,number,number]
}

export interface IStack<T>{
    push(item:T):void,
    pop():T|undefined,
    peek():T|undefined,
    size():number
}

export interface IGrahamScan{
    display:{
        points:points,
        hull:points,
        start:point,
        mid:point,
        end:point,
    },
    stack:IStack<rawPoint>,
    findLowestY():rawPoint,
    sortPoints():void,
    validatePoint():boolean,
}

export interface CustomCanvasProps{
    data:RenderData;
}

export interface State{
    step:boolean,
    needsUpdate:boolean,
    grahamScan:IGrahamScan,
    clientSide:boolean,
    width:number,
    height:number,
    render:RenderData
}

export interface Props{
}
