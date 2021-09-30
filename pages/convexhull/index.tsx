import React from "react";
import {State,Props} from '../../types/convexhull/app.types'
import CustomCanvas from "./CustomCanvas";

export default class App extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state={
            stackArr:[],
            points:[],
            hull:[]
        }
    }

    genRandomPoints=(n:number)=>{
        
    }

    componentDidMount(){

    }

    render(){
        return <div className="flex flex-col w-screen h-screen md:flex-row">
            <CustomCanvas />
            <div className="h-full p-2 text-white bg-blue-500 md:w-3/5">
                <div className="">
                Motive: This page was designed to 
                </div>
                <h2 className="font-bold">Finding the convex hull of n points.</h2>
                <h4>Graham Scan Algorithm</h4>
                <pre>
                <code>
                {'>'}    hello
                </code>
                </pre>
            </div>
        </div>
    }
}
