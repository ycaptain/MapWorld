var _process = process;
process.once('loaded', function() {
  global.process= _process;
});

window.readCoors = require('./loader').readCoors;
window.path = require('path');
window.fs = require('fs');
window.electron = require('electron');
