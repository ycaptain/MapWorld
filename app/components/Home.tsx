import React from "react";
import { Link } from "react-router-dom";
import Box from "./renderer/Box";
import Canvas from "./renderer/Canvas";
import { Button } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Home = (): JSX.Element => {
  return (
    <div>
      <div
        className={
          "absolute z-10 max-w-sm h-40 flex p-6 bg-white rounded-lg shadow-xl m-auto inset-0 justify-center items-center text-center"
        }
      >
        <FontAwesomeIcon
          className={"self-center"}
          icon={faCoffee}
          color={"orange"}
          size={"5x"}
        />
        <div className={"ml-6 pt-1"}>
          <h2 className={"text-4xl text-gray-900 text-center leading-tight"}>
            Map World
          </h2>
          <Link to="/renderer">
            <div className="mt-4">
              <Button
                type={"primary"}
                className={
                  "hover:text-white focus:outline-none hover:bg-teal-500 bg-teal-700 border border-teal-500 text-xs font-semibold rounded-full px-4 py-1 leading-normal"
                }
              >
                Meet better life!
              </Button>
            </div>
          </Link>
        </div>
      </div>
      <div className={"h-screen"}>
        <Canvas style={{ height: "100%" }}>
          <Box position={[-2, 0, 0]} />
          <Box position={[2, 0, 0]} />
        </Canvas>
      </div>
    </div>
  );
};

export default Home;
