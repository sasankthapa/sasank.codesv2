import * as THREE from 'three';

export const sortLowestY=(points:Array<THREE.Vector3>)=>{
    const toReturn=new THREE.Vector3();
    points.forEach((point)=>{
        if(point.y <= toReturn.y && point.x < toReturn.x){
             
        }
    })
}

export const findLowestY=()=>{
}

export const sortBasedOnAngle=(lowestY:THREE.Vector3,toSort:Array<THREE.Vector3>)=>{
}
