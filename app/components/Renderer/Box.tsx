import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import {ReactThreeFiber} from "react-three-fiber/three-types";
import * as THREE from "three";

function Box(props: ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh>) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      {...props}
    >
      <boxBufferGeometry attach="geometry" args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}

export default Box;
