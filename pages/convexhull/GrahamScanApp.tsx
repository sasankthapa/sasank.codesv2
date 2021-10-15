import React  from "react";
import { point, points, RenderData } from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import dynamic from 'next/dynamic'
import { GrahamScanApp, GrahamScanProps } from "../../types/convexhull/grahamscan.types";
import { genRandomPoints } from "./functions/Utils";

const DynamicCanvas=dynamic(
    ()=>import('./CustomCanvas'),
    {ssr:false}
)

export default class App extends React.Component<GrahamScanProps,GrahamScanApp>{
    constructor(props:GrahamScanProps){
        super(props);
        this.state={
            play:false,
            step:0,
            needsUpdate:false,
            points:50,
            name:props.instance.name,
            display:props.instance.display,
            instance:props.instance.instance,
            steps:props.instance.steps,
            planeSize:20,
            sparseRadius:10,
            render:{
                pointData:[],
                pointsData:[],
                linesData:[]
            }
        }
    }

    updateRenderData=async()=>{
        this.setState(_=>{
            const toReturn:RenderData={pointData:[],pointsData:[],linesData:[]}
            for(const [k,v] of Object.entries(this.state.display)){
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
        this.renderData();
    }

    renderData=()=>{
        console.log('th')
        this.setState((prev,{instance})=>{
            const list=genRandomPoints(prev.points,prev.sparseRadius);
            const newState={...prev}
            newState.display.points.data=list;
            newState.instance.array=list;
            return newState;
        })
        this.updateRenderData();
    }

    render(){
        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <DynamicCanvas data={this.state.render} planeArgs={[this.state.planeSize,this.state.planeSize,10,10]}/>
            <AlgorithmDisplay 
                steps={this.state.steps}
                currStep={this.state.step} 
                currPlaneSize={this.state.planeSize}
                sparseRadius={this.state.sparseRadius} 
                pointsNum={this.state.points}
                setPlaneSize={(size:number)=>this.setState({planeSize:size})} 
                setSparseRadius={(rad:number)=>this.setState({sparseRadius:rad})}
                setPointsNum={(num:number)=>this.setState({points:num})}
                step={()=>this.setState(prev=>{step:prev.step+1})}
                play={()=>this.setState({play:true})}
                pause={()=>this.setState({play:false})}
                render={()=>this.renderData()}
            />
        </div>
    }
}
