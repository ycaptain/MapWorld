import React, { useEffect, useState } from 'react';
import {
  Canvas,
  Axes,
  Controller,
  Building,
  Item,
  Ground,
} from "@/components/renderer";
import sateTextureUrl from "../../../resources/textures/a00d13ba_RAW_0.png";
import roadTextureUrl from "../../../resources/textures/a00d13ba_0_road.png";
import { TextureLoader } from 'three';

interface Props {
  items: Array<Item>;
}

const Renderer: React.FC<Props> = ({items}) => {
  const [texture, setTexture] = useState<any>(null);
  const [texture2, setTexture2] = useState<any>(null);

  useEffect(() => {
    setTexture(new TextureLoader().load(sateTextureUrl));
    setTexture2(new TextureLoader().load(roadTextureUrl));
  }, [sateTextureUrl, roadTextureUrl]);

  return (<Canvas camera={{ position: [15, 15, 5], up: [0, 0, 1] }}>
    <Ground buildings={items} sateImage={texture} roadImage={texture2}/>
    <Axes />
    <Controller />
  </Canvas>);
}

export default React.memo(Renderer);
