import {BaseAlgorithm, BaseState, IStack, point, points, RenderData } from './app.types'

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

// For better type inference
export interface IGrahamScan extends BaseAlgorithm{
    display:{
        points:points,
        hull:points,
        hullPoly:points,
        hullLine:points,
        innerhull:points,
        lowest:point,
        start:point,
        mid:point,
        end:point,
        testingLine:points
    };
    str:{
        i:number,
        array:Array<THREE.Vector2>,
        stack:IStack<THREE.Vector2>,
        innerhull:Array<THREE.Vector2>
    };
    steps:Array<Step<IGrahamScan>>;
    getRender(instance:IGrahamScan):RenderData
}

// --TODO-- 
// implement redux stores to handle this mess and the UI
export interface AlgorithmDisplayProps{
    algoName:string,
    playing:boolean,
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
