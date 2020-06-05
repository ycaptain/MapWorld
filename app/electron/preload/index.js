var _process = process;
process.once('loaded', function() {
  global.process= _process;
});

window.readJSON = require('./loader').readJSON;
window.path = require('path');
window.fs = require('fs');
window.os = require('os');
window.electron = require('electron');
