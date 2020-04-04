import React, { useRef, useState, useEffect } from "react";
import { ReactThreeFiber } from "react-three-fiber/three-types";

import * as THREE from "three";
import { Coordicate, minus, cross } from "../../utils/Arith";

const Building: React.FC<IBuilding> = (props) => {
  const { item, ...rest } = props;

  const mesh = useRef<THREE.Mesh>(null);
  const geo = useRef<THREE.BufferGeometry>(null);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const coors = anticlockwise(item.coordinates);
  const vertices = getVertices(coors, item.properties.height);
  const verticesBuffer = new Float32Array(vertices);

  useEffect(() => {
    if (geo.current) {
      geo.current.computeVertexNormals();
    }
  }, [geo]);

  return (
    <mesh
      receiveShadow
      castShadow
      ref={mesh}
      scale={active ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      {...rest}
    >
      <bufferGeometry
        ref={geo}
        attach="geometry"
      >
        <bufferAttribute
          attachObject={["attributes", "position"]}
          normalized
          itemSize={3}
          array={verticesBuffer}
          count={vertices.length / 3}
        />
      </bufferGeometry>
      <meshPhongMaterial
        attach="material"
        transparent
        opacity={0.6}
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
};

function getVertices(coors: Coordicate[], height: number) {
  const vertices = [];

  const fir = coors[0].toArray();
  const last = coors[coors.length - 1].toArray();

  // sides out
  vertices.push(
    ...[
      ...fir,
      ...coors[1].toArray(),
      ...coors[1].toArray().slice(0, 2),
      height,

      ...fir,
      ...coors[1].toArray().slice(0, 2),
      height,
      ...fir.slice(0, 2),
      height,

      ...last,
      ...fir,
      ...fir.slice(0, 2),
      height,

      ...last,
      ...fir.slice(0, 2),
      height,
      ...last.slice(0, 2),
      height,
    ]
  );

  let n = 2;
  while (n <= coors.length - 1) {
    const sec = coors[n - 1].toArray();
    const thi = coors[n].toArray();

    // sides
    vertices.push(
      ...[
        ...sec,
        ...thi,
        ...thi.slice(0, 2),
        height,

        ...sec,
        ...thi.slice(0, 2),
        height,
        ...sec.slice(0, 2),
        height,
      ]
    );

    // top
    vertices.push(
      ...[
        ...fir.slice(0, 2),
        height,
        ...sec.slice(0, 2),
        height,
        ...thi.slice(0, 2),
        height,
      ]
    );

    // bottom
    // vertices.push(...[...fir, ...sec, ...thi]);

    n += 1;
  }

  return vertices;
}

function anticlockwise(coors: Coordicate[]) {
  const { 0: firCoor, 1: secCoor, [coors.length - 1]: lastCoor } = coors;
  const coorA = minus(secCoor, firCoor);
  const coorB = minus(lastCoor, firCoor);
  const coorN = cross(coorA, coorB);

  if (coorN.z >= 0) {
    return coors;
  }

  return coors.reverse();
}

interface IBuilding
  extends ReactThreeFiber.Object3DNode<THREE.Mesh, typeof THREE.Mesh> {
  item: Item;
}

type Item = {
  coordinates: Coordicate[];
  properties: {
    height: number;
  };
};

export { Item };

export default Building;
