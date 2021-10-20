import React from 'react'
import { AlgorithmDisplayProps } from '../../types/convexhull/grahamscan.types'

const AlgorithmDisplay: React.FC<AlgorithmDisplayProps> = ({ playing, algoName, pointsNum, setPointsNum,  render, steps, currStep, currPlaneSize, sparseRadius, setPlaneSize, setSparseRadius, step, play, pause }) => {
    console.log(currStep)
    return <div className="flex flex-col p-2 text-white bg-blue-500 md:w-3/5">
        <div className="block ">
            <h1 className="font-bold">{algoName}</h1>
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
                <input onChange={(e)=>setPointsNum(e.target.valueAsNumber)} id="sparserad" className="w-full text-black text-center" type="number" value={pointsNum} placeholder="Sparse Radius" />
                <label htmlFor="pointnumber"># of Points</label>
            </div>
            <button onClick={()=>render()} className="rounded-md bg-green-500 h-full px-2 flex-grow text-center">
                Render
            </button>
        </div>
        <div className="flex justify-center w-full gap-2">
            <button onClick={step} className="p-2 bg-gray-100 text-gray-700 rounded-lg">Step</button>
            <button onClick={play} className={`p-2 text-gray-700 rounded-lg ${playing?"bg-green-500":"bg-green-200"}`}>Play</button>
            <button onClick={pause} className="p-2 bg-gray-100 text-gray-700 rounded-lg">Pause</button>
        </div>
        <div className="my-2 p-2 bg-gray-200 text-black rounded-md border-2 border-black box-border">
            <div>
                {steps[currStep].info}
            </div>
        </div>
        <div className="">
            <pre className="bg-blue-200">
                <code className="text-black w-full">
                    {steps.map((step,index)=>{
                        const classList=["w-full"]
                        if(index===currStep) classList.push('bg-blue-300')
                        return <div key={step.psuedo} className={classList.join(' ')}>
                           {`${index===currStep?'>|':'  '}${step.psuedo}\n`}
                        </div>
                    })}
                </code>
            </pre>
        </div>
    </div>
}

export default AlgorithmDisplay;
