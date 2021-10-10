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

const partition=(array: Array<number>, left: number = 0, right: number = array.length - 1)=>{
  const pivot = array[Math.floor((right + left) / 2)];
  let i = left;
  let j = right;

  while (i <= j) {
    while (array[i] < pivot) {
      i++;
    }

    while (array[j] > pivot) {
      j--;
    }

    if (i <= j) {
      [array[i], array[j]] = [array[j], array[i]];
      i++;
      j--;
    }
  }

  return i;
}

export const quickSort=(array: Array<number>, left: number = 0, right: number = array.length - 1) =>{
  let index;

  if (array.length > 1) {
    index = partition(array, left, right);

    if (left < index - 1) {
      quickSort(array, left, index - 1);
    }

    if (index < right) {
      quickSort(array, index, right);
    }
  }

  return array;
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
