import {BaseAlgorithm, BaseState, IStack, point, points, RenderData } from './app.types'

type stepReturn<T>={
    next:boolean,
    instance?:T
}

export type Step<T extends BaseAlgorithm>={
    index?:number,
    info:string, 
    psuedo:string,// <pre> string
    fn:(instance:T, fast?:boolean)=>stepReturn<T>, // returns whether we go to next step or not
}

// For better type inference
export interface IGrahamScan extends BaseAlgorithm{
    display:{
        points:points,
        hull:points,
        hull2:points,
        lowest:point,
        start:point,
        mid:point,
        end:point,
        testingLine:points
    },
    str:{
        i:number,
        array:Array<THREE.Vector2>,
        stack:IStack<THREE.Vector2>,
    },
}

export interface GrahamScanClass extends IGrahamScan{
    steps:Array<Step<IGrahamScan>>
    getRender(instance:IGrahamScan):RenderData
}

// --TODO-- 
// implement redux stores to handle this mess and the UI
export interface AlgorithmDisplayProps{
    steps:Array<Step<any>>,
    currStep:number,
    currPlaneSize:number,
    sparseRadius:number,
    pointsNum:number,
    setPlaneSize:(size:number)=>void;
    setSparseRadius:(rad:number)=>void;
    setPointsNum:(num:number)=>void;
    step:()=>void;
    play:()=>void;
    pause:()=>void;
    render:()=>void;
}

export interface GrahamScanApp extends BaseState<GrahamScanClass>{
}

export interface GrahamScanProps{
}
