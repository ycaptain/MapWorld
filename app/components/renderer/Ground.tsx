import React from "react";
import * as THREE from "three";
import {ReactThreeFiber} from "react-three-fiber/three-types";
// import TestTextureURL from '../../../resources/textures/tuanjiehu.png';

import {useLoader} from "react-three-fiber";

interface IGround
  extends ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh> {
  texture: THREE.Texture
}

const Ground: React.FC<IGround> = (props) => {

  window.path = require("path");

  const TestTexture = useLoader(THREE.TextureLoader, '../../../resources/textures/tuanjiehu.png');

  if (TestTexture) {
    TestTexture.wrapS = TestTexture.wrapT = THREE.RepeatWrapping;
    TestTexture.repeat.set(1500, 1500);
    TestTexture.anisotropy = 16;
  }

  return (
    <mesh
    {...props}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]}  />
      {/*<meshBasicMaterial attach="material" color={0xD9B420} side={THREE.DoubleSide} />*/}
      {TestTexture &&
        <meshPhongMaterial attach="material" map={TestTexture} />
      }
    </mesh>
  )

}

export default Ground;
