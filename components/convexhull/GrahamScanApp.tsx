import React  from "react";
import { point, points, RenderData } from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import dynamic from 'next/dynamic'
import { GrahamScanApp as State, GrahamScanClass, GrahamScanProps as Props, IGrahamScan} from "../../types/convexhull/grahamscan.types";
import { genRandomPoints } from "../../lib/Utils";
import { GrahamScan } from "../../lib/GrahamScan";

const DynamicCanvas=dynamic(import('./CustomCanvas'),{ssr:false})

export default class App extends React.Component<Props,State>{
    constructor(props:State){
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
        const instance=new GrahamScan()
        const list=genRandomPoints(this.state.pointsNum,this.state.sparseRadius);
        instance.display.points.data=list;
        instance.str.array=list;
        this.setState({instance})
    }

    handleStep(){
        const toReturn={...this.state};
        const {next,instance=null}=this.state.instance.steps[this.state.step].fn(this.state.instance)
        if(next){
            toReturn.step=toReturn.step+1;
        }
        if(instance!==null){
            const {display,str}=instance;
            const instance2={...this.state.instance,display,str};
            this.setState({instance:instance2})
        }
        this.setState(toReturn)
    }

    render(){
        const renderdata=this.state.instance.getRender(this.state.instance);

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
                step={this.handleStep.bind(this)}
                play={()=>this.setState({play:true})}
                pause={()=>this.setState({play:false})}
                render={()=>this.renderData()}
            />
        </div>
    }
}
