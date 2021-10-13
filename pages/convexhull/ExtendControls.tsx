import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { extend, ReactThreeFiber } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointMaterial, PointMaterialImpl } from '@react-three/drei'

extend({ OrbitControls,DragControls, PointMaterial});

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'orbitControls': ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>;
      'dragControls': ReactThreeFiber.Object3DNode<DragControls, typeof DragControls>;
      'pointMaterial': ReactThreeFiber.Object3DNode<PointMaterialImpl, typeof PointMaterial>;
    }
  }
}
