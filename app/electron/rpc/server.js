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

      NotifyLoadCheckpoint: function (result) {
        result(null, { code: 0, msg: 'pong' });
      },
      NotifyStartThread: function (result) {
        result(null, { code: 0, msg: 'pong' });
      },
      NotifyPredImg: function (count, total, result) {
        console.debug(count, total);
        result(null, { code: 0, msg: 'pong' });
      },
      NotifyBatchPred: function (count, total, result) {
        console.debug(count, total);
        result(null, { code: 0, msg: 'pong' });
      },
      NotifyResult: function (req, result) {
        console.debug(req);
        result(null, { code: 0, msg: 'pong' });
      },
    });
    this.server.listen(port || 7777);
  }
}

module.exports = { RpcServer };
