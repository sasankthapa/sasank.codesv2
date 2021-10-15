import React  from "react";
import { point, points, RenderData } from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import dynamic from 'next/dynamic'
import { GrahamScanApp, GrahamScanProps } from "../../types/convexhull/grahamscan.types";
import { genRandomPoints } from "./functions/Utils";
import { GrahamScan } from "./functions/GrahamScan";

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
            pointsNum:32,
            instance:new GrahamScan(),
            planeSize:50,
            sparseRadius:20,
        }
    }

    componentDidMount(){
        this.renderData();
    }

    renderData=()=>{
        this.setState((prev)=>{
            const instance=new GrahamScan()
            const list=genRandomPoints(prev.pointsNum,prev.sparseRadius);
            instance.display.points.data=list;
            instance.instance.array=list;
            return {...prev,instance};
        })
    }

    render(){
        const getRenderDataFromInstance=()=>{
            const toReturn:RenderData={pointData:[],pointsData:[],linesData:[]}
            for(const [k,v] of Object.entries(this.state.instance.display)){
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

        const renderdata=getRenderDataFromInstance();

        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <DynamicCanvas data={renderdata} planeArgs={[this.state.planeSize,this.state.planeSize,10,10]}/>
            <AlgorithmDisplay 
                steps={this.state.instance.steps}
                currStep={this.state.step} 
                currPlaneSize={this.state.planeSize}
                sparseRadius={this.state.sparseRadius} 
                pointsNum={this.state.pointsNum}
                setPlaneSize={(size:number)=>this.setState({planeSize:size})} 
                setSparseRadius={(rad:number)=>this.setState({sparseRadius:rad})}
                setPointsNum={(num:number)=>this.setState({pointsNum:num})}
                step={()=>this.setState((prev)=>{
                    const {next,instance=null}=prev.instance.steps[prev.step].fn(prev.instance)
                    if(next && instance!==null)
                        return {...prev,instance,step:prev.step+1}
                    return {}
                })}
                play={()=>this.setState({play:true})}
                pause={()=>this.setState({play:false})}
                render={()=>this.renderData()}
            />
        </div>
    }
}
