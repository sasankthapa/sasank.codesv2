export interface AlgorithmDisplayProps{

}

type line=[THREE.Vector3,THREE.Vector3]

export interface CustomCanvasProps{
    points:Array<THREE.Vector3>,
    lines?:Array<line>
}

export interface State{
    stackArr:Array<THREE.Vector3>,
    points:Array<THREE.Vector3>,
    hull:Array<THREE.Vector3>,
    clientSide:boolean
}

export interface Props{
}
