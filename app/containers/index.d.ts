import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ReactThreeFiber } from "react-three-fiber/three-types";
import { Color } from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
      color: ReactThreeFiber.Object3DNode<Color, typeof Color>
    }
  }
}
