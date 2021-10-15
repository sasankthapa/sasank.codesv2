import {Canvas} from '@react-three/fiber';
import React  from 'react'
import BackgroundPlane from './BackgroundPlane';

const GLRenderer = () => {
    return <div className="z-0 w-screen h-screen absolute top-0 left-0">
        <Canvas className="w-full h-full">
                <BackgroundPlane z={10}/>
        </Canvas>
    </div>
}

export default GLRenderer;
