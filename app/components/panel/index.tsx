import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ipcRenderer } from "electron";

const Panel: React.FC<Panel> = (props) => {
  const { loadMap } = props;

  const [configPath, setConfigPath] = useState<string>("");
  const [modelPath, setModelPath] = useState<string>("");

  useEffect(() => {
    ipcRenderer.on("predict-r", (_, resp) => {
      console.info(resp);
    });
  }, []);

  function initPred({
    configPath,
    modelPath,
    frAddr,
    frPort,
  }: InitRequest): void {
    ipcRenderer.send("predict", { configPath, modelPath, frAddr, frPort });
  }

  return (
    <div className={"flex h-full"}>
      <div className={"flex w-12 bg-teal-400 h-full"}>
        <Link to="/" className={"relative bottom-0 mx-auto my-2"}>
          <Button
            className={
              "hover:text-white hover:outline-none focus:outline-none hover:bg-teal-400 border-none bg-teal-500 text-xs font-semibold rounded-full leading-normal"
            }
            type="primary"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </Button>
        </Link>
      </div>
      <div>
        <Button onClick={() => loadMap()}>Load</Button>
        <div>
          <Input
            value={configPath}
            onChange={(e) => setConfigPath(e.target.value)}
          />
          <Input
            value={modelPath}
            onChange={(e) => setModelPath(e.target.value)}
          />
          <Button
            onClick={() =>
              initPred({ configPath, modelPath, frAddr: "", frPort: "" })
            }
          >
            Init
          </Button>
        </div>
      </div>
    </div>
  );
};

type Panel = {
  loadMap: Function;
};

type InitRequest = {
  configPath: string;
  modelPath: string;
  frAddr: string;
  frPort: string;
};

export default Panel;
