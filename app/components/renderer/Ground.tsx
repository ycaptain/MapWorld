import React, { useEffect, useState } from "react";
import { TextureLoader, Texture, Mesh } from "three";
import { ReactThreeFiber } from "react-three-fiber/three-types";
import { Item, Building } from "./Building";
import { MixShader } from "./shaders/mixShader"
// import textureUrl from "../../../resources/textures/tuanjiehu.png";

interface IGround extends ReactThreeFiber.Object3DNode<Mesh, typeof Mesh> {
  sateImage?: Texture;
  roadImage?: Texture;
  buildings?: Array<Item>;
}

const Ground: React.FC<IGround> = (props) => {
  const [sateTexture, setSateTexture] = useState<any>(null);
  const [roadTexture, setRoadTexture] = useState<any>(null);

  useEffect(() => {
     //setTexture(new TextureLoader().load(props.texture));
     setSateTexture(props.sateImage);
     setRoadTexture(props.roadImage);
  }, [props]);

  return (
    <group {...props}>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[100, 100]} />
        <shaderMaterial attach="material"
          args={[MixShader]}
          uniforms-texture-value={sateTexture}
          uniforms-texture2-value={roadTexture} />
        {/* <meshPhongMaterial attach="material" map={texture} /> */}
      </mesh>
      {props.buildings && props.buildings.map((item, idx) => <Building key={idx} item={item} />)}
    </group>
  );
};

export { Ground };
