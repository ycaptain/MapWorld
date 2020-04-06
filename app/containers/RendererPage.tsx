import React, { useState, useEffect } from "react";
import Box from "../components/renderer/Box";
import Canvas from "../components/renderer/Canvas";
import Plane from "../components/renderer/Plane";
import Axes from "../components/renderer/Axes";
import Controller from "../components/renderer/Controller";
import Building, { Item } from "../components/renderer/Building";
import Panel from "../components/panel";

const RendererPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const loadMap = async () => {
    const {
      readCoors,
      electron: { remote },
    } = window;
    const { filePaths } = await remote.dialog.showOpenDialog({
      title: "打开文件",
      buttonLabel: "打开",
      properties: ["openFile"],
    });
    if (filePaths.length) {
      const data = await readCoors(filePaths[0]);
      setItems(data);
    }
  }

  const renderCanvas = () => (
    <Canvas camera={{ position: [15, 15, 5], up: [0, 0, 1] }}>
      {items && items.map((item, idx) => <Building key={idx} item={item} />)}
      <Plane />
      <Axes />
      <Controller />
    </Canvas>
  );

  return (
    <div className={"w-screen h-screen flex justify-between"}>
      <div className={"max-w-xs w-full bg-teal-500"}>
        <Panel loadMap={loadMap} />
      </div>
      <div className={"float-right w-full h-full"}>{renderCanvas()}</div>
    </div>
  );
};

export default RendererPage;
