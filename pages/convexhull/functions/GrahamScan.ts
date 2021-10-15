import {Vector2} from "three";
import {Stack} from './Utils';
import { point, points, RenderData} from '../../../types/convexhull/app.types'
import { GrahamScanClass, IGrahamScan, Step } from "../../../types/convexhull/grahamscan.types";

const findLowestYInArray=(points:Array<THREE.Vector2>):THREE.Vector2=>{
    let lowestY=Infinity;
    let lowestX=Infinity;
    let lowestPoint:THREE.Vector2|null=null;
    points.forEach((point)=>{
        if(point.y < lowestY){
            lowestY=point.y;
            lowestPoint=point;
        }else if(point.y === lowestY){
            if(point.x < lowestX){
                lowestY=point.y;
                lowestX=point.x;
                lowestPoint=point;
            }
        }
    })
    return lowestPoint!==null?lowestPoint:new Vector2(-1,-1);
}

function findAngleX(x:THREE.Vector2,y:THREE.Vector2){
    const v=new Vector2(y.x,y.y).sub(x);
    return v.angle();
}

const findAngles=(lowest:THREE.Vector2,arr:Array<THREE.Vector2>)=>{
    return [...arr].map((curr)=>{
        findAngleX(lowest,curr)
    })
}

const sortBasedOnAngle=(lowest:THREE.Vector2,arr:Array<THREE.Vector2>)=>{
    const angles=findAngles(lowest,arr.splice(1));
    console.log(angles)
}

export class GrahamScan implements GrahamScanClass{
    name='GrahamScan';
    instance={
        array:[],
        stack:new Stack<THREE.Vector2>()
    }
    stack=new Stack<Vector2>();
    display={
        points:{type:'points',color:0xff00ff} as points,
        hull:{type:'points',color:0xff00ff} as points,
        hull2:{type:'line',color:0xff00ff} as points,
        lowest:{type:'point',color:0x00ff00} as point,
        start:{type:'point',color:0xff00ff} as point,
        mid:{type:'point',color:0xff00ff} as point,
        end:{type:'point',color:0xff00ff}as point
    }
    getRender(){
        const toReturn:RenderData={pointData:[],pointsData:[],linesData:[]}
        for(const [k,v] of Object.entries(this.display)){
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

    steps:Array<Step<IGrahamScan>>=[{info:"find point with the lowest Y",fn:(instance:IGrahamScan)=>{
            if(!instance.display.points){
                return {next:false}  
            }
            const lowest=findLowestYInArray(instance.display.points.data)
            instance.display.lowest.data=lowest;
            return {next:true,instance}
        },psuedo:'findLowestY()'},
        {info:"first step",fn:(instance:IGrahamScan)=>{
            instance.display.hull2.data=instance.display.points.data
            return {next:true,instance}
        },psuedo:'Sort Points w angle to lowest()'},
        {info:"first step",fn:(instance:IGrahamScan)=>{
            return {next:true}
        },psuedo:'while i<S.length:\n\tdo the things'},
    ];
}
