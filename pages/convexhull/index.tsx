import React  from "react";
import {State,Props, point, points, RenderData } from '../../types/convexhull/app.types'
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
            pause:false,
            play:false,
            next:false,
            step:0,
            needsUpdate:false,
            grahamScan:new GrahamScan(),
            planeSize:20,
            sparseRadius:50,
            render:{
                pointData:[],
                pointsData:[],
                linesData:[]
            }
        }
    }

    createPoints=(n:number)=>{
        this.setState((prev)=>{
            const list=genRandomPoints(n,prev.sparseRadius);
            const newState={...prev};
            newState.grahamScan.display.points['data']=list;
            return newState
        })
    }

    updateRenderData=async()=>{
        this.setState(_=>{
            const toReturn:RenderData={pointData:[],pointsData:[],linesData:[]}
            for(const [k,v] of Object.entries(this.state.grahamScan.display)){
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
            return {
                render:toReturn
            }
        })
    }

    componentDidMount(){
            this.createPoints(50)
            this.updateRenderData()
            setTimeout(()=>{
                this.createPoints(50)
                this.updateRenderData()
            },3000)
    }

    render(){
        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <DynamicCanvas data={this.state.render} planeArgs={[this.state.planeSize,this.state.planeSize,10,10]}/>
            <AlgorithmDisplay steps={this.state.grahamScan.steps}
                currStep={this.state.step} currPlaneSize={this.state.planeSize}
                sparseRadius={this.state.sparseRadius} setPlaneSize={(size:number)=>this.setState({planeSize:size})} 
                setSparseRadius={(rad:number)=>this.setState({sparseRadius:rad})}
                step={()=>this.setState({next:true})}
                play={()=>this.setState({play:true})}
                pause={()=>this.setState({pause:true})}
            />
        </div>
    }
}
