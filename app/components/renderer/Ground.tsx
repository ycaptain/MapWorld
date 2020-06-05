import React, { useEffect, useState } from 'react';
import { TextureLoader, Texture, Mesh } from 'three';
import { ReactThreeFiber } from 'react-three-fiber/three-types';
import { Item, Building } from './Building';
import { MixShader } from './shaders/mixShader';
import { RawBuilding } from '@/actions/render';
// import textureUrl from "../../../resources/textures/tuanjiehu.png";

interface IGround extends ReactThreeFiber.Object3DNode<Mesh, typeof Mesh> {
  sateImage: Texture;
  roadImage: Texture;
  buildings: Array<Item>;
  meta: RawBuilding['meta'];
}

const Ground: React.FC<IGround> = ({
  sateImage,
  roadImage,
  buildings,
  meta,
  ...rest
}) => {
  const { 'origin.x': x, 'origin.y': y, w, h } = meta;
  console.info(meta);
  return (
    <group position={[x, y, 0]} {...rest}>
      <mesh position={[w / 2, h / 2, 0]}>
        <planeBufferGeometry attach="geometry" args={[w, h]} />
        <shaderMaterial
          attach="material"
          args={[MixShader]}
          uniforms-texture-value={sateImage}
          uniforms-texture2-value={roadImage}
        />
      </mesh>
      {buildings &&
        buildings.map((item, idx) => {
          return <Building key={idx} item={item} />;
        })}
    </group>
  );
};

export { Ground };
