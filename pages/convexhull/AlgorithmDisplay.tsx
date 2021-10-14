import React from 'react'
import { AlgorithmDisplayProps } from '../../types/convexhull/app.types'

const AlgorithmDisplay: React.FC<AlgorithmDisplayProps> = ({ steps, currStep, currPlaneSize, sparseRadius, setPlaneSize, setSparseRadius, step, play, pause }) => {

    return <div className="flex flex-col h-full p-2 text-white bg-blue-500 md:w-3/5">
        <div className="block group">
            <h1 className="font-bold">Motivation</h1>
            <p className="group-hover:block transition-all">
            </p>
        </div>
        <div className="flex w-full items-center gap-1 py-2 bg-blue-500 my-1 border-t-2">
            <div className="flex-grow text-center">
                <input onChange={(e)=>setPlaneSize(e.target.valueAsNumber)} id="planesize" className="w-full text-black text-center" type="number" value={currPlaneSize} placeholder="Plane Size" />
                <label htmlFor="planesize">Plane Size</label>
            </div>
            <div className="flex-grow text-center">
                <input onChange={(e)=>setSparseRadius(e.target.valueAsNumber)} id="sparserad" className="w-full text-black text-center" type="number" value={sparseRadius} placeholder="Sparse Radius" />
                <label htmlFor="sparserad">Sparse Radius</label>
            </div>
            <div className="flex-grow text-center">
                <input onChange={(e)=>setSparseRadius(e.target.valueAsNumber)} id="sparserad" className="w-full text-black text-center" type="number" value={sparseRadius} placeholder="Sparse Radius" />
                <label htmlFor="pointnumber"># of Points</label>
            </div>
            <button className="rounded-md bg-green-500 h-full flex-grow text-center">
                Render
            </button>
        </div>
        <pre className="bg-blue-300">
            <code className="text-black">
                {steps.map((step,index)=>`${index===currStep?'>|':' '}${step.psuedo}\n`)}
            </code>
        </pre>
        <div className="flex justify-center w-full">
            <button className="p-2" onClick={step}>Step</button>
            <button className="p-2">Play</button>
        </div>
    </div>
}

export default AlgorithmDisplay;
