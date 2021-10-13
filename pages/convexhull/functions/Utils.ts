import * as THREE from 'three';
import {IStack} from '../../../types/convexhull/app.types';

export const sortLowestY=(points:Array<THREE.Vector2>)=>{
    const toReturn=new THREE.Vector2();
    points.forEach((point)=>{
        if(point.y <= toReturn.y && point.x < toReturn.x){
             
        }
    })
}

function getRandInt(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min);
}

export const genRandomPoints=(n:number,sparse:number)=>{
    const toReturn:Array<THREE.Vector2>=[];
    for(let i=0 ;i < n ;i++){
        toReturn.push(new THREE.Vector2(getRandInt(-sparse, sparse),getRandInt(-sparse, sparse)))
    }
    return toReturn;
}

export class Stack<T> implements IStack<T>{
    private storage:Array<T>=[];
    
    push(item:T){
        this.storage.push(item)
    }

    pop(){
        return this.storage.pop();
    }

    peek(){
        return this.storage[-1];
    }

    size(){
        return this.storage.length;
    }
}
