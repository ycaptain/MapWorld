import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ReactThreeFiber } from "react-three-fiber/three-types";
import { Item } from "./components/renderer/Building";
import { Color } from "three";
import path from "path";
import electron from 'electron';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
      color: ReactThreeFiber.Object3DNode<Color, typeof Color>;
    }
  }

  interface Window {
    path: typeof path;
    electron: typeof electron;
    readCoors: (filePath: string) => Promise<Item[]>;
  }
}

