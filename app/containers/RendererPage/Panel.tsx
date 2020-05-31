import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { connectClient, initClient, doPred } from "@/utils/ipc";
import { IpcChannels } from "@/utils/ipc";
import { ipcRenderer, IpcRendererEvent } from "electron";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadMap } from "@/utils/map";

const Panel: React.FC = ({...rest}) => {
  const [configPath, setConfigPath] = useState<string>("");
  const [modelPath, setModelPath] = useState<string>("");
  const [isConnecting, setConnecting] = useState(false);

  // useEffect(() => {
  //   const funcA = (evnet: IpcRendererEvent, ...args: any) => {
  //     console.info(args);
  //   };
  //   ipcRenderer.on(IpcChannels.CONNECT_CLIENT, funcA);

  //   return () => {
  //     ipcRenderer.removeListener(IpcChannels.CONNECT_CLIENT, funcA);
  //   };
  // });

  // return (
  //   <div className={"flex h-full"}>
  //     <div>
  //       <Button onClick={loadMap}>Load</Button>
  //       <div>
  //         <Input
  //           value={configPath}
  //           onChange={(e) => setConfigPath(e.target.value)}
  //         />
  //         <Input
  //           value={modelPath}
  //           onChange={(e) => setModelPath(e.target.value)}
  //         />
  //         <Button
  //           onClick={() => {
  //             connectClient();
  //           }}
  //         >
  //           Init
  //         </Button>
  //         <Button
  //           onClick={() => {
  //             initClient({
  //               configPath:
  //                 "/Users/ycaptain/workspace/2020/learning/electron/MapWorld/MapWorld-pred/test/testpack/PackedModels.json",
  //             });
  //           }}
  //         >
  //           Init
  //         </Button>
  //         <Button
  //           onClick={() => {
  //             doPred({
  //               imgsPath: [
  //                 "/Users/ycaptain/workspace/2020/learning/electron/MapWorld/resources/test.png",
  //               ],
  //               imgsMeta: [
  //                 {
  //                   origin: {
  //                     x: 0,
  //                     y: 0,
  //                   },
  //                   pixelSize: { x: 0, y: 0 },
  //                 },
  //               ],
  //               modelName: "Building-Deeplab",
  //               gpu: 0,
  //             });
  //           }}
  //         >
  //           doPred
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div {...rest}>
      Test
    </div>
  );
};

export default Panel;
