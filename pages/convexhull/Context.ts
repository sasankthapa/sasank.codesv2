import React from 'react'
import { Vector2 } from 'three';
import { point, points, ContextData, GenerateContext, GenerateInitialContext } from "../../types/convexhull/app.types";

export const genIniContextData:GenerateInitialContext=(display)=>{
    const toReturn:ContextData={
        pointData:[],
        pointsData:[],
        linesData:[]
    }
    for (const [k, v] of Object.entries(display)) {
        if(v.data){
            if(v.type==='point'){
                toReturn.pointData?.push(v as point);
            }else if(v.type==='points'){
                toReturn.pointsData?.push(v as points);
            }else if(v.type==='line'){
                toReturn.linesData?.push(v as points);
            }
        }
    }
    return toReturn;
}

export const updateContextData:GenerateContext=(context,display)=>{
    return context;
}

export const baseContext={
    pointData:null,
    pointsData:null,
    linesData:null,
}

export const DataContext=React.createContext<ContextData>(baseContext);

