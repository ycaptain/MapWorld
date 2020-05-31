import React, { useEffect, useState } from "react";
import { TextureLoader, Texture, Mesh } from "three";
import { ReactThreeFiber } from "react-three-fiber/three-types";
import textureUrl from "../../../resources/textures/tuanjiehu.png";

interface IGround extends ReactThreeFiber.Object3DNode<Mesh, typeof Mesh> {
  texture?: Texture;
}

const Ground: React.FC<IGround> = (props) => {
  const [texture, setTexture] = useState<any>(null);

  useEffect(() => {
    console.log(textureUrl);
    setTexture(new TextureLoader().load(textureUrl));
  }, [textureUrl]);

  return (
    <mesh {...props}>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshPhongMaterial attach="material" map={texture} />
    </mesh>
  );
};

export { Ground };
