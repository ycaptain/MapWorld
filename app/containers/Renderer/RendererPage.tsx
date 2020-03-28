import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Box from "../../components/Renderer/Box";
import Canvas from "../../components/Renderer/Canvas";
import Plane from "../../components/Renderer/Plane";
import Axes from "../../components/Renderer/Axes";
import Controller from "./Controller";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ReactThreeFiber } from "react-three-fiber/three-types";
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

const RendererPage = (): JSX.Element => {
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
        <Plane />
        <Axes />
        <Controller />
      </Canvas>
    </div>
  );
};

export default RendererPage;
