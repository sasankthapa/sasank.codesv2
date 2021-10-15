import {Vector2} from "three";
import {Stack} from './Utils';
import { point, points, RenderData, Step} from '../../../types/convexhull/app.types'
import { IGrahamScan } from "../../../types/convexhull/grahamscan.types";

const findLowestYInArray=(points:Array<THREE.Vector2>):THREE.Vector2=>{
    let lowest=Infinity;
    let lowestPoint:THREE.Vector2|null=null;
    points.forEach((point)=>{
        if(point.y < lowest){
            lowest=point.y;
            lowestPoint=point;
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

export const sortBasedOnAngle=(lowest:THREE.Vector2,arr:Array<THREE.Vector2>)=>{
    const angles=findAngles(lowest,arr.splice(1));
    console.log(angles)
}

export class GrahamScan implements IGrahamScan{
    name='GrahamScan';
    instance={
        array:[],
        stack:new Stack<THREE.Vector2>()
    }
    stack=new Stack<Vector2>();
    display={
        points:{type:'points',color:0xff00ff} as points,
        hull:{type:'points',color:0xff00ff} as points,
        lowest:{type:'point',color:0xffffff} as point,
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
    findLowestY=()=>{
        if(this.display.points){
            return findLowestYInArray(this.display.points.data||[])
        }
        return new Vector2(-1,-1);
    }
    sortPoints(){
        return [];
    }
    validatePoints(){
        return false;
    }
    steps=[{info:"first step",fn:()=>{},psuedo:'findLowestY()'} as Step,
        {info:"first step",fn:()=>{},psuedo:'Sort Points()'} as Step,
        {info:"first step",fn:()=>{},psuedo:'while i<S.length:\n\tdo the things'} as Step,
    ];
}
