import React  from "react";
import AlgorithmDisplay from "./AlgorithmDisplay";
import dynamic from 'next/dynamic'
import { genRandomPoints } from "../../lib/Utils";
import { GrahamScan } from "../../lib/GrahamScan";
import { BaseState,BaseProps } from "../../types/convexhull/app.types";
import { IGrahamScan } from "../../types/convexhull/grahamscan.types";

const DynamicCanvas=dynamic(import('./CustomCanvas'),{ssr:false})

export default class App extends React.Component<BaseProps<IGrahamScan>,BaseState<IGrahamScan>>{
    constructor(props:BaseProps<IGrahamScan>){
        super(props);
        this.state={
            play:false,
            step:0,
            pointsNum:32,
            instance:props.instance,
            planeSize:50,
            sparseRadius:20,
        }
    }

    componentDidMount(){
        this.renderData();
    }

    renderData=()=>{
        const newS={...this.state}
        const list=genRandomPoints(this.state.pointsNum,this.state.sparseRadius);
        newS.instance.display.points.data=list;
        newS.instance.str.array=list;
        this.setState({instance:newS.instance,step:0})
    }

    play=()=>{
        console.log('th')
        this.setState({play:true})
        setInterval(()=>{
            if(this.state.play)
                this.handleStep()
        },500);
    }

    handleStep(){
        const toReturn={...this.state};
        const {next,instance=null,step}=this.state.instance.steps[this.state.step].fn(this.state.instance)
        if(instance!==null){
            toReturn.instance=instance as IGrahamScan;
        }
        if(next){
            toReturn.step=toReturn.step+1;
        }
        if(step){
            toReturn.step=step;
        }
        console.log(step)
        this.setState(toReturn)
    }

    render(){
        console.log(this.state.instance)
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
                play={()=>{
                    this.play()
                }}
                pause={()=>this.setState({play:false})}
                render={()=>this.renderData()}
            />
        </div>
    }
}
