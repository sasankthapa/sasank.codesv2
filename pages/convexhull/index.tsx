import React  from "react";
import {State,Props, point, points } from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import dynamic from 'next/dynamic'
import {genRandomPoints} from './functions/Utils';
import {GrahamScan} from './functions/GrahamScan';
const DynamicCanvas=dynamic(
    ()=>import('./CustomCanvas'),
    {ssr:false}
)

export default class App extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state={
            step:false,
            needsUpdate:false,
            grahamScan:new GrahamScan(),
            clientSide:false,
            width:0,
            height:0,
            render:{
                pointData:[],
                pointsData:[],
                linesData:[]
            }
        }
    }

    createPoints=(n:number)=>{
        this.setState((prev)=>{
            const list=genRandomPoints(n,5);
            const newState={...prev};
            newState.grahamScan.display.points['data']=list;
            return newState
        })
    }

    updateRenderData=()=>{
        this.setState(prev=>{
            const toReturn={...prev.render}
            for(const [k,v] of Object.entries(this.state.grahamScan.display)){
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
            return {
                render:toReturn
            }
        })
    }

    componentDidMount(){
        this.createPoints(10)
        this.updateRenderData()
    }

    step(){
        this.setState({step:true})
    }

    render(){
        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <DynamicCanvas data={this.state.render}/>
            <AlgorithmDisplay step={this.step.bind(this)}/>
        </div>
    }
}
