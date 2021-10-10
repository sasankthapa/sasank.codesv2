import {Vector2} from "three";
import {Stack} from './Utils';
import {IGrahamScan} from '../../../types/convexhull/app.types'

export const findLowestY=(points:Array<THREE.Vector2>)=>{
    let lowest=Infinity;
    points.forEach((point)=>{
        if(point.y < lowest){
            lowest=point.y;
        }
    })
    return lowest
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
    stack=new Stack<Vector2>();
    points=[];
    hull=[];
    lowest=undefined;
    start=undefined;
    mid=undefined;
    end=undefined;
}
