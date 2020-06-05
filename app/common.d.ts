import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ReactThreeFiber } from 'react-three-fiber/three-types';
import { Item } from './components/renderer/Building';
import { Color } from 'three';
import path from 'path';
import fs from 'fs';
import os from 'os';
import electron from 'electron';
import { RawBuilding } from '@/actions/render';

declare global {
  module JSX {
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
    fs: typeof fs;
    os: typeof os;
    electron: typeof electron;
    readJSON: (filePath: string) => Promise<RawBuilding>;
    //  => Promise<{
    //   coors: Item[];
    //   meta: {
    //     'origin.x': number;
    //     'origin.y': number;
    //     w: number;
    //     h: number;
    //     prescale: number;
    //   };
    //   roadImg: string;
    // }>;
  }
}
