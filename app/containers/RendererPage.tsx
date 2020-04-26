import React, { useState } from "react";
import Canvas from "../components/renderer/Canvas";
import Plane from "../components/renderer/Plane";
import Axes from "../components/renderer/Axes";
import Controller from "../components/renderer/Controller";
import Building, { Item } from "../components/renderer/Building";
import Panel from "../components/panel";
import { ArrowsAltOutlined, ShrinkOutlined } from "@ant-design/icons";
import Ground from "../components/renderer/Ground";

const RendererPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isFull, setFull] = useState<Boolean>(false);

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
  };

  const renderCanvas = () => (
    <Canvas camera={{ position: [15, 15, 5], up: [0, 0, 1] }}>
      {/*<Plane />*/}
      <Ground />
      <Axes />
      <Controller />
      {items && items.map((item, idx) => <Building key={idx} item={item} />)}
    </Canvas>
  );

  // FIXME: resize canvas after zooming
  return (
    <div className={"w-screen h-screen flex justify-between"}>
      {!isFull && (
        <div className={"max-w-xs w-full bg-teal-500"}>
          <Panel loadMap={loadMap} />
        </div>
      )}
      <div className={"w-full h-full"}>
        {renderCanvas()}
        <div className={"absolute right-0 bottom-0 mr-6 mb-6 z-10"}>
          <button
            className={
              "bg-transparent p-0 w-8 h-8 border border-solid border-black"
            }
          >
            {isFull ? (
              <ShrinkOutlined
                className={"inline-block align-middle"}
                onClick={() => setFull(false)}
              />
            ) : (
              <ArrowsAltOutlined
                className={"inline-block align-middle"}
                onClick={() => setFull(true)}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RendererPage;
