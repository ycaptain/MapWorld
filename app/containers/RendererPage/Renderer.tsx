import React from 'react';
import {
  Canvas,
  Axes,
  Controller,
  Building,
  Item,
  Ground,
} from "@/components/renderer";

interface Props {
  items: Array<Item>;
}

const Renderer: React.FC<Props> = ({items}) => {
  return (<Canvas camera={{ position: [15, 15, 5], up: [0, 0, 1] }}>
    {/*<Plane />*/}
    <Ground />
    <Axes />
    <Controller />
    {items && items.map((item, idx) => <Building key={idx} item={item} />)}
  </Canvas>);
}

export default React.memo(Renderer);
