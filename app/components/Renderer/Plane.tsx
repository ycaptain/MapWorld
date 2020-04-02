import React from "react";
import * as THREE from "three";

function Plane(props: any) {

  return (
    <mesh
    {...props}
    >
      <planeBufferGeometry attach="geometry" args={[100, 100]}  />
      <meshBasicMaterial attach="material" color={0xD9B420} side={THREE.DoubleSide} />
    </mesh>
  )

}

export default Plane;
