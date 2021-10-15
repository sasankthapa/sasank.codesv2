import {BaseAlgorithm, BaseState, IStack, point, points, RenderData, Step} from './app.types'

export interface grahamFunctions{ //Functions to run for
}

export interface IGrahamScan extends BaseAlgorithm{
    display:{
        points:points,
        hull:points,
        start:point,
        mid:point,
        end:point,
    },
    steps:Array<Step>,
    instance:{
        array:Array<THREE.Vector2>,
        stack:IStack<THREE.Vector2>,
    }
    findLowestY():THREE.Vector2,
    sortPoints():Array<THREE.Vector2>,
    validatePoints():boolean,
    getRender():RenderData
}

export interface GrahamScanApp extends BaseState<IGrahamScan>{
}

export interface GrahamScanProps{
    instance:IGrahamScan
}
