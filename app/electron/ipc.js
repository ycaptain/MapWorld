const { ipcMain } = require('electron');
const { RpcClient } = require('./rpc/client');
const { RpcServer } = require('./rpc/server');
const { IpcChannels } = require('../common/constants/ipc');

const { mainWindow } = require('./main.development');
const path = require('path');

const rpcClient = new RpcClient();
let rpcServer;
const port = 7777;
let tmpFolder = '';

const initialize = win => {
  if (rpcClient.conn || rpcClient.client) {
    rpcClient.disconnect();
  }

  if (!rpcServer) {
    rpcServer = new RpcServer(win);
    rpcServer.start(port);
  }

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

ipcMain.on(IpcChannels.DO_PRED, async (event, requests) => {
  if (!rpcClient.conn || !rpcClient.conn.connected) {
    initialize(rpcServer.win);
  }

  for (const request of requests) {
    const {
      id,
      imgsPath,
      imgsMeta,
      modelName,
      gpu,
      tmpOptPath,
      prescale,
      batchSize,
      cycleganType,
    } = request;
    console.debug('tmp folder: ', tmpOptPath);
    const res = await rpcClient.doPred({
      id,
      imgs_path: imgsPath,
      imgs_meta: imgsMeta.map(({ origin }) => ({
        origin,
      })),
      model_name: modelName,
      n_gpu_use: gpu || 0,
      tmp_opt_path: tmpOptPath,
      prescale,
      batch_size: batchSize,
      cyclegan_type: cycleganType,
    });
    console.info(res);
  }
  // rpcClient.disconnect();
  event.sender.send(IpcChannels.DO_PRED, { msg: 'success' });
});

module.exports = { rpcClient, rpcServer, initialize };
