//Renderers
type rawPoint=THREE.Vector2;
type rawPoints=Array<THREE.Vector2>;

type bufferTypes='point'|'points'|'line';

export type point={index?:number,type:bufferTypes,data:rawPoint,color:number};
export type points={index?:number,type:bufferTypes,data:rawPoints,color:number};

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

export interface EuclidProps extends RenderData{
    planeArgs:[number,number,number,number];
}

export interface IStack<T>{
    push(item:T):void,
    pop():T|undefined,
    peek():T|undefined,
    size():number
}

type Step={
    index?:number,
    info:string, // <pre> string
    psuedo:string,
    fn:()=>boolean,
}

export interface BaseAlgorithm{
    name:string,
    display:{
        [key:string]:point|points
    },
    steps:Array<Step>
}

export interface IGrahamScan extends BaseAlgorithm{
    display:{
        points:points,
        hull:points,
        start:point,
        mid:point,
        end:point,
    },
    array:Array<THREE.Vector2>,
    stack:IStack<THREE.Vector2>,
    findLowestY():boolean,
    sortPoints():boolean,
    validatePoint():boolean,
    getRender():RenderData
}

export interface CustomCanvasProps{
    planeArgs:[number,number,number,number];
    data:RenderData;
}

export interface AlgorithmDisplayProps{
    steps:Array<Step>,
    currStep:number,
    currPlaneSize:number,
    sparseRadius:number,
    setPlaneSize:(size:number)=>void;
    setSparseRadius:(rad:number)=>void;
    step:()=>void;
    play:()=>void;
    pause:()=>void;
}

export interface State{
    pause:boolean,
    play:boolean,
    next:boolean,
    step:number,
    needsUpdate:boolean,
    grahamScan:IGrahamScan,
    sparseRadius:number,
    planeSize:number,
    render:RenderData
}

export interface Props{
}
