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

export interface BaseAlgorithm{
    name:string,
    display:{
        [key:string]:point|points
    },
    instance:{
        [key:string]:any
    },
}

export interface BaseState<T extends BaseAlgorithm>{
    play:boolean,
    step:number,
    pointsNum:number,
    instance:T,
    needsUpdate:boolean,
    sparseRadius:number,
    planeSize:number,
}

export interface CustomCanvasProps{
    planeArgs:[number,number,number,number];
    data:RenderData;
}


