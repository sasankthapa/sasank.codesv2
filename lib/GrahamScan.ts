import * as THREE from "three";
import {Stack} from './Utils';
import { BaseAlgorithm, point, points, RenderData} from '../types/convexhull/app.types'
import { IGrahamScan, Step } from "../types/convexhull/grahamscan.types";
import { findLowestYInArray, sortBasedOnAngle, validatePoints } from "./GrahamScanUtils";

export class GrahamScan implements IGrahamScan{
    name='GrahamScan';
    str:IGrahamScan['str']={
        i:0,
        array:[],
        stack:new Stack<THREE.Vector2>(),
        innerhull:[]
    }
    instance=null;
    display={
        points:{type:'points',color:0xf0f0ff} as points,
        hull:{type:'points',color:0x00ff00,size:1.5} as points,
        innerhull:{type:'points',color:0x0000ff,size:0.8} as points,
        hullPoly:{type:'poly',color:0xff0000} as points,
        hullLine:{type:'line',color:0x00ff00} as points,
        lowest:{type:'point',color:0x00ff00,size:1.3} as point,
        start:{type:'point',color:0xff0f00,size:2} as point,
        mid:{type:'point',color:0xff0f00,size:2} as point,
        end:{type:'point',color:0xff000f,size:2}as point,
        testingLine:{type:'line',color:0xff0000} as points,
    }

    getRender(instance:IGrahamScan){
        const toReturn:RenderData={pointData:[],pointsData:[],linesData:[],polyData:[]}
        for(const [k,v] of Object.entries(instance.display)){
            if(v.data){
                if(v.data.length===0) continue;
                if(v.type==='point'){
                    toReturn.pointData?.push(v as point);
                }else if(v.type==='points'){
                    toReturn.pointsData?.push(v as points);
                }else if(v.type==='line'){
                    toReturn.linesData?.push(v as points);
                }else if(v.type==='poly'){
                    toReturn.polyData?.push(v as points);
                }
            }
        }
        return toReturn;
    }

    steps:Array<Step<IGrahamScan>>=[
        {
            info:"Initialize data types",
            fn:()=>{
                //fake aleady Initialized
                return {next:true}
            },
            psuedo:'arr=points, Stack s;'
        },{
            info:"Find point with the lowest Y",
            psuedo:'lowest=findLowestY()',
            fn:(instance:IGrahamScan)=>{
                if(!instance.display.points){
                    return {next:false}  
                }
                const lowest=findLowestYInArray(instance.display.points.data)
                instance.display.lowest.data=lowest;
                return {next:true,instance}
            },
        },{
            info:"Sort array with respect to horizotal axes (x) of lowest.",
            psuedo:'arr=SortWLowest(arr,lowest)',
            fn:(instance:IGrahamScan)=>{
                const sorted=sortBasedOnAngle(instance.display.lowest.data,instance.str.array)
                console.log(instance.str.array.length)
                console.log(sorted.length)
                instance.str.array=sorted;
                return {next:true,instance}
            },
        },{
            info:"Add first 2 points to stack",
            psuedo:'Add first 2 points to stack',
            fn:(instance:IGrahamScan)=>{
                instance.str.stack.push(instance.display.lowest.data)
                instance.str.stack.push(instance.str.array[1])
                instance.str.stack.push(instance.str.array[2])
                instance.display.start.data=instance.display.lowest.data;
                instance.display.mid.data=instance.str.array[1];
                instance.display.end.data=instance.str.array[2];
                instance.display.testingLine.data=[]
                instance.display.testingLine.data.push(instance.display.start.data)
                instance.display.testingLine.data.push(instance.display.mid.data)
                instance.display.testingLine.data.push(instance.display.end.data)
                instance.str.i=2;
                return {next:true,instance}
            },
        },{
            info:"increment the value of i",
            psuedo:'for i=3 to n:',
            fn:(instance:IGrahamScan)=>{
            instance.str.i+=1;
            if(instance.str.i>=instance.str.array.length)
                return {next:false,step:6}
            const arr=instance.str.stack.get().slice(-2);
            instance.display.start.data=arr[0];
            instance.display.mid.data=arr[1];
            instance.display.end.data=instance.str.array[instance.str.i];
            instance.display.testingLine.data=[]
            instance.display.testingLine.data.push(arr[0])
            instance.display.testingLine.data.push(arr[1])
            instance.display.testingLine.data.push(instance.str.array[instance.str.i])
            return {next:true,instance}
            },
        },{
            info:"Test the turn made by last 2 points of the stack and arr[i]. If we make a right turn, pop the last point from the stack",
            psuedo:'\twhile PQxQR < 0 :\n\t\ttest if left or right turn',
            fn:(instance:IGrahamScan)=>{
                instance.display.hullLine.data=instance.str.stack.get()
                if(instance.str.i >= instance.str.array.length){
                    console.log('next')
                    return {next:true}
                }
                const pop=validatePoints(instance.display.start.data,instance.display.mid.data,instance.display.end.data);
                if(pop){
                    const val=instance.str.stack.pop()
                    if(val)
                        instance.str.innerhull.push(val)
                    const arr=instance.str.stack.get().slice(-2);
                    instance.display.start.data=arr[0];
                    instance.display.mid.data=arr[1];
                    instance.display.end.data=instance.str.array[instance.str.i];
                    instance.display.testingLine.data=[]
                    instance.display.testingLine.data.push(arr[0])
                    instance.display.testingLine.data.push(arr[1])
                    instance.display.testingLine.data.push(instance.str.array[instance.str.i])
                    instance.display.hullLine.data=instance.str.stack.get()
                    return {next:false,instance}
                }else{
                    const hull=instance.str.stack.get();
                    instance.display.hull.data=hull;
                    instance.str.stack.push(instance.display.end.data);
                    return {next:false,instance,step:4}
                }
            }, 
        },{
            info:"inner hull in blue",
            psuedo:'displayHull()',
            fn:(instance:IGrahamScan)=>{
                instance.display.hullLine.data=[]
                instance.display.start.data=new THREE.Vector2(100,100);
                instance.display.mid.data=new THREE.Vector2(100,100);
                instance.display.end.data=new THREE.Vector2(100,100);
                instance.display.testingLine.data=[]
                const hull=instance.str.stack.get();
                instance.display.hullPoly.data=hull;
                instance.display.hull.data=hull;
                instance.display.innerhull.data=instance.str.innerhull;
                return {next:true}
            }
        },
    ];
}
