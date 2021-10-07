import React from 'react'
import {AlgorithmDisplayProps} from '../../types/convexhull/app.types'

const AlgorithmDisplay:React.FC<AlgorithmDisplayProps> = () => {
    return <div className="h-full p-2 text-white bg-blue-500 md:w-3/5">
        <div className="">
        Motive: This page was designed to 
        </div>
        <h2 className="font-bold">Finding the convex hull of n points.</h2>
        <h4>Graham Scan Algorithm</h4>
        <pre>
        <code>
        {'>'}Find lowest Y coordinate.
        </code>
        </pre>
        <div className="flex justify-center w-full">
            <button className="p-2">Step</button>
            <button className="p-2">Play</button>
        </div>
    </div>
}

export default AlgorithmDisplay;
