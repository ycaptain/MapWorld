const {
  initPred
} = require('./predictor');
const path = require('path');
const {
  ipcMain
} = require('electron');
const {
  spawn
} = require('child_process');

ipcMain.on('predict', (event, configPath, modelPath, frAddr, frPort) => {
  (async () => {
    try {
      const resp = await initPred(configPath, modelPath, frAddr, frPort);
      event.reply('predict-r', resp);
    } catch (e) {
      console.error(e);
    }
  })();
});
