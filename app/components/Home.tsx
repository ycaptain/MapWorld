import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Demo from "./Demo3D";
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
        <Demo />
      </div>
    </div>
  );
};

export default Home;
