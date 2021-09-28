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
        return <div className="flex w-screen h-screen">
            <CustomCanvas />
            <div className="w-3/5 h-full p-2 text-white bg-blue-500">
                <h2 className="font-bold">Finding the convex hull of n points.</h2>
                <h4>Graham Scan Algorithm</h4>
                <pre>
                <code>
                </code>
                </pre>
            </div>
        </div>
    }
}
