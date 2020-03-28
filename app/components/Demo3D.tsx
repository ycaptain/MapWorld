import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from 'three';


export function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>(null);

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    }
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
}

function Demo() {

  return (
    <Canvas style={{height: '500px'}}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-2, 0, 0]} />
      <Box position={[2, 0, 0]} />
    </Canvas>
  );
}

export default Demo;
