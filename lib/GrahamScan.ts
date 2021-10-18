import {Vector2} from "three";
import {Stack} from './Utils';
import { point, points, RenderData} from '../types/convexhull/app.types'
import { GrahamScanClass, IGrahamScan, Step } from "../types/convexhull/grahamscan.types";
import { findLowestYInArray, sortBasedOnAngle, validatePoints } from "./GrahamScanUtils";

export class GrahamScan implements GrahamScanClass{
    name='GrahamScan';
    str:IGrahamScan['str']={
        i:0,
        array:[],
        stack:new Stack<THREE.Vector2>()
    }
    instance=null;
    stack=new Stack<Vector2>();
    display={
        points:{type:'points',color:0xf0f0ff} as points,
        hull:{type:'points',color:0xff0fff} as points,
        hull2:{type:'line',color:0xff00ff} as points,
        lowest:{type:'point',color:0x00ff00,size:1.3} as point,
        start:{type:'point',color:0xffff00,size:2} as point,
        mid:{type:'point',color:0xff00f0,size:2} as point,
        end:{type:'point',color:0xff000f,size:2}as point,
        testingLine:{type:'line',color:0xff0000} as points,
    }

    getRender(instance:IGrahamScan){
        const toReturn:RenderData={pointData:[],pointsData:[],linesData:[]}
        for(const [k,v] of Object.entries(instance.display)){
            console.log(k,v)
            if(v.data){
                if(v.type==='point'){
                    console.log(k)
                    toReturn.pointData?.push(v as point);
                }else if(v.type==='points'){
                    console.log(k)
                    toReturn.pointsData?.push(v as points);
                }else if(v.type==='line'){
                    console.log(k)
                    toReturn.linesData?.push(v as points);
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
            info:"find point with the lowest Y",
            psuedo:'findLowestY()',
            fn:(instance:IGrahamScan)=>{
                if(!instance.display.points){
                    return {next:false}  
                }
                const lowest=findLowestYInArray(instance.display.points.data)
                instance.display.lowest.data=lowest;
                return {next:true,instance}
            },
        },{
            info:"Sort array()",
            psuedo:'Sort Points w angle to lowest()',
            fn:(instance:IGrahamScan)=>{
                const sorted=sortBasedOnAngle(instance.display.lowest.data,instance.str.array)
                console.log(sorted)
                instance.str.array=sorted;
                return {next:true,instance}
            },
        },{
            info:"--",
            psuedo:'Add first 3 points to stack',
            fn:({display,str}:IGrahamScan)=>{
                str.stack.push(display.lowest.data)
                str.stack.push(str.array[0])
                str.stack.push(str.array[1])
                display.start.data=display.lowest.data;
                display.mid.data=str.array[0];
                display.end.data=str.array[1];
                str.i=3;
                display.hull.data=str.stack.getLast(-1);
                display.hull2.data=str.stack.getLast(-1);
                const instance={display,str} as IGrahamScan
                return {next:true,instance}
            },
        },{
            info:"",
            psuedo:'for i:3 to n:',
            fn:(instance:IGrahamScan)=>{
            console.log(instance.display.hull2.data);
            console.log(instance.str.stack);
            instance.str.i+=1;
            return {next:true,instance}
            },
        },{
            info:"",
            psuedo:'while PQxQR < 0 :',
            fn:(instance:IGrahamScan)=>{
                const pop=validatePoints(instance.display.start.data,instance.display.mid.data,instance.display.end.data);
                if(pop){
                    console.log('rgiht')
                    instance.str.stack.pop()
                }else{
                    console.log('left')
                    instance.str.stack.push(instance.display.end.data);
                }
                const [a,b]=instance.str.stack.getLast(-2);
                console.log(a,b)
                instance.display.start.data=a;
                instance.display.mid.data=b;
                instance.display.end.data=instance.str.array[instance.str.i];
                instance.display.testingLine.data=[]
                instance.display.testingLine.data.push(a)
                instance.display.testingLine.data.push(b)
                instance.display.testingLine.data.push(instance.str.array[instance.str.i])
                instance.str.i+=1;
                return {next:false,instance}
            },
        },
    ];
}
