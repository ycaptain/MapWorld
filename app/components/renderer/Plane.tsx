import React from "react";
import * as THREE from "three";

const Plane: React.FC = (props: any) => {
  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial
        attach="material"
        color={0xd9b420}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export { Plane };
