import React  from "react";
import {State,Props } from '../../types/convexhull/app.types'
import AlgorithmDisplay from "./AlgorithmDisplay";
import dynamic from 'next/dynamic'
import {genRandomPoints} from './functions/Utils';
import {GrahamScan} from './functions/GrahamScan';
import {baseContext, DataContext,genIniContextData} from './Context';

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
            dataContextState:baseContext
        }
    }

    createPoints=async(n:number)=>{
        const list=genRandomPoints(n,5);
        this.setState((prev)=>{
            const newState={...prev};
            newState.grahamScan.display.points['data']=list;
            return newState
        })
    }

    getContextData(){
        console.log(this.state.grahamScan.display)
        const data=genIniContextData(this.state.grahamScan.display);
        console.log(data)
    }

    componentDidMount(){
        this.createPoints(10).then(()=>{
            this.getContextData()
        })
    }

    step(){
        this.setState({step:true})
    }

    render(){
        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <DataContext.Provider value={this.state.dataContextState||baseContext}>
                <DynamicCanvas />
            </DataContext.Provider>
            <AlgorithmDisplay step={this.step.bind(this)}/>
        </div>
    }
}
