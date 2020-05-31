const { ipcMain } = require("electron");
const { RpcClient } = require("./rpc/client");
const { IpcChannels } = require("../common/constants/ipc");

let rpcClient = new RpcClient();

ipcMain.on(IpcChannels.CONNECT_CLIENT, (event) => {
  rpcClient.connect();
  event.sender.send(IpcChannels.CONNECT_CLIENT, "success");
});

ipcMain.on(
  IpcChannels.INIT_CLIENT,
  async (event, { configPath, frAddr, frPort }) => {
    await rpcClient.initialize({
      config_path: configPath,
      fr_addr: frAddr,
      fr_port: frPort,
    });
  }
);

ipcMain.on(
  IpcChannels.DO_PRED,
  async (
    event,
    { imgsPath, imgsMeta, modelName, gpu, tmpOptPath, prescale, batchSize }
  ) => {
    const res = await rpcClient.doPred({
      imgs_path: imgsPath,
      imgs_meta: imgsMeta.map(({ origin, pixelSize }) => ({
        origin,
        pixel_size: pixelSize,
      })),
      model_name: modelName,
      n_gpu_use: gpu,
      tmp_opt_path: tmpOptPath,
      prescale,
      batch_size: batchSize,
    });
    console.info(res);
  }
);

// (async() => {
//   let res = ;
//   res = await rpcClient.doPred({
//     imgs_path: [path.join(__dirname, '../../resources/test.png')],
//     imgs_meta: [{origin: {x: 0, y: 0}, pixel_size: {x: 748, y: 932}}],
//     // model_name: 'Road-Deeplab',
//     model_name: 'Building-Deeplab',
//     n_gpu_use: 0,
//   })
//   res = await rpcClient.getTask();
//   res = await rpcClient.getTask();
//   res = await rpcClient.getTask();
//   rpcClient.disconnect();
//   console.info(res);
// })();
