import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { ReactThreeFiber } from "react-three-fiber/three-types";
import * as THREE from "three";

const Box: React.FC<ReactThreeFiber.Object3DNode<
  THREE.Mesh,
  typeof THREE.Mesh
>> = (props) => {
  const mesh = useRef<THREE.Mesh>(null);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      {...props}
    >
      <boxBufferGeometry attach="geometry" args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
};

export { Box };
