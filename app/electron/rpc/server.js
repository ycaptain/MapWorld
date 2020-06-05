const thrift = require('thrift');
const MapWolrdMain = require('./service/MapWorldMain');
const ttypes = require('./service/main_types');
const { BrowserWindow } = require('electron');
const { IpcChannels } = require('../../common/constants/ipc');

class RpcServer {
  constructor(win) {
    this.server = null;
    this.win = win;
  }

  start(port) {
    this.server = thrift.createServer(MapWolrdMain, {
      NotifyProgress: (req, result) => {
        console.debug(req);
        result(null, { code: 0, msg: 'pong' });
        this.win.webContents.send(IpcChannels.NOTIFY_PROGRESS, req);
      },

      NotifyPredImg: (req, result) => {
        console.debug(req);
        result(null, { code: 0, msg: 'pong' });
        this.win.webContents.send(IpcChannels.NOTIFY_PRED_IMG, req);
      },
      NotifyBatchPred: (req, result) => {
        console.debug(req);
        result(null, { code: 0, msg: 'pong' });
        this.win.webContents.send(IpcChannels.NOTIFY_BATCH_PRED, req);
      },
      NotifyResult: (req, result) => {
        console.debug(req);
        result(null, { code: 0, msg: 'pong' });
        this.win.webContents.send(IpcChannels.NOTIFY_RESULT, req);
      },
    });
    this.server.listen(port || 7777);
  }

  close() {
    this.server.close();
    this.server = null;
  }
}

module.exports = { RpcServer };
