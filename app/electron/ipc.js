const { ipcMain } = require('electron');
const { RpcClient } = require('./rpc/client');
const { RpcServer } = require('./rpc/server');
const { IpcChannels } = require('../common/constants/ipc');
const path = require('path');
const fs = require('fs');
const os = require('os');

const { mainWindow } = require('./main.development');

const rpcClient = new RpcClient();
let rpcServer;
const port = 7777;

const initialize = (win) => {
  if (rpcClient.conn || rpcClient.client) {
    rpcClient.disconnect();
  }

  rpcServer = new RpcServer(win);

  rpcServer.start(port);

  rpcClient.connect();
  rpcClient.initialize({
    config_path: path.resolve(
      __dirname,
      '../../MapWorld-pred/test/testpack/PackedModels.json'
    ),
    fr_addr: 'localhost',
    fr_port: port,
  });
};

ipcMain.on(
  IpcChannels.DO_PRED,
  async (
    event,
    { imgsPath, imgsMeta, modelName, gpu, tmpOptPath, prescale, batchSize }
  ) => {
    if (!rpcClient.conn.connected) {
      initialize();
    }

    modelName = modelName || 'Building-Deeplab';
    const folder = await fs.promises.mkdtemp(path.join(os.tmpdir(), modelName));
    console.debug('tmp folder: ', folder);
    const res = await rpcClient.doPred({
      imgs_path: imgsPath,
      imgs_meta: imgsMeta.map(({ origin, pixelSize }) => ({
        origin,
        pixel_size: pixelSize,
      })),
      model_name: modelName,
      n_gpu_use: gpu || 0,
      tmp_opt_path: tmpOptPath || folder,
      prescale,
      batch_size: batchSize,
    });
    console.info(res);
    event.sender.send(IpcChannels.DO_PRED, { msg: 'success' });
  }
);

module.exports = { rpcClient, rpcServer, initialize };
