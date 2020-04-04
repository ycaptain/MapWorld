import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Box from "../components/renderer/Box";
import Canvas from "../components/renderer/Canvas";
import Plane from "../components/renderer/Plane";
import Axes from "../components/renderer/Axes";
import Controller from "../components/renderer/Controller";
import Building from "../components/renderer/Building";
import { Coordicate } from "../utils/Arith";


const RendererPage: React.FC = () => {
  const fakeJSON = {
    coordinates: [
      new Coordicate(0, 0, 0),
      new Coordicate(0, 5, 0),
      new Coordicate(5, 5, 0),
      new Coordicate(10, 2.5, 0),
      new Coordicate(5, 0, 0)
    ],
    properties: {
      height: 2
    }
  };
  return (
    <div>
      <Link
        to="/"
        style={{ position: "absolute", top: 0, margin: "10px", zIndex: 1 }}
      >
        <Button type="primary">Back</Button>
      </Link>
      <Canvas camera={{ position: [15, 15, 5], up: [0, 0, 1] }}>
        <Box position={[-2, 0, 0]} />
        <Box position={[2, 0, 0]} />
        <Building position={[6, 0, 0]} item={fakeJSON} />
        <Plane />
        <Axes />
        <Controller />
      </Canvas>
    </div>
  );
};

export default RendererPage;
