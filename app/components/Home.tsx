import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Box from "./renderer/Box";
import Canvas from "./renderer/Canvas";
let styles = require("./Home.less");

const Home = (): JSX.Element => {
  return (
    <div>
      <div className={styles.container}>
        <h2 style={{ userSelect: "none" }}>Home</h2>
        <Link to="/renderer">
          <Button type="primary">Renderer</Button>
        </Link>
      </div>
      <div className={styles.container}>
        <Canvas style={{ height: "500px" }} bgColor={0xffffff}>
          <Box position={[-2, 0, 0]} />
          <Box position={[2, 0, 0]} />
        </Canvas>
      </div>
    </div>
  );
};

export default Home;
