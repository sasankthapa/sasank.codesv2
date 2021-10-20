//Renderers
type rawPoint=THREE.Vector2;
type rawPoints=Array<THREE.Vector2>;

type bufferTypes='point'|'points'|'line'|'poly';

export type point={index?:number,size:number,type:bufferTypes,data:rawPoint,color:number};
export type points={index?:number,size:number,type:bufferTypes,data:rawPoints,color:number};

export interface PointsRendererProps{
    pointData:Array<point>,
    pointsData:Array<points>
}

export interface LineRendererProps{
    linesData:Array<points> //multple line segments
}

export interface PolygonRendererProps{
    polyData:Array<points>
}

type AddNullType<T> ={
    [Property in keyof T]:T[Property]|null;
}

export interface RenderData extends PointsRendererProps, LineRendererProps, PolygonRendererProps {}

export interface EuclidProps extends RenderData{
    planeArgs:[number,number,number,number];
}

export interface IStack<T>{
    push(item:T):void,
    pop():T|undefined,
    peek():T|undefined,
    size():number,
    get():Array<T>
}

type stepReturn<T>={
    next:boolean,
    instance?:T,
    step?:number
}

export type Step<T extends BaseAlgorithm>={
    index?:number,
    info:string, 
    psuedo:string,// <pre> string
    fn:(instance:T, fast?:boolean)=>stepReturn<T>, // returns whether we go to next step or not
}

export interface BaseAlgorithm{
    name:string,
    display:{
        [key:string]:point|points|null;
    },
    str:{
        [key:string]:any
    },
}

export interface BaseState<T extends BaseAlgorithm>{
    play:boolean,
    step:number,
    pointsNum:number,
    instance:T,
    sparseRadius:number,
    planeSize:number,
}

export interface BaseProps<T extends BaseAlgorithm>{
    instance:T,
}

export interface CustomCanvasProps{
    planeArgs:[number,number,number,number];
    data:RenderData;
}

