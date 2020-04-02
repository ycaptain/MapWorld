import React, { useRef, useState } from "react";
import { ReactThreeFiber } from "react-three-fiber/three-types";

import * as THREE from "three";
import { Coordicate, minus, cross } from "../../utils/Arith";

const Building: React.FC<IBuilding> = props => {
  const { item, ...rest } = props;

  const mesh = useRef<THREE.Mesh>(null);

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  const coors = anticlockwise(item.coordinates);
  const vertices = getVertices(coors, item.properties.height);

  return (
    <mesh
      ref={mesh}
      scale={active ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
      {...rest}
    >
      <bufferGeometry
        attach="geometry"
        attributes={{
          position: new THREE.BufferAttribute(new Float32Array(vertices), 3)
        }}
      />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

function getVertices(coors: Coordicate[], height: number) {
  const vertices = [];

  const fir = coors[0].toArray();

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
      height
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
        height
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
        height
      ]
    );

    // bottom
    vertices.push(...[...fir, ...sec, ...thi]);

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
