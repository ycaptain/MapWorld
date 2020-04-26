//
// Autogenerated by Thrift Compiler (0.13.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;
var Int64 = require('node-int64');


var ttypes = module.exports = {};
var Exception = module.exports.Exception = function(args) {
  Thrift.TException.call(this, "Exception");
  this.name = "Exception";
  this.message = null;
  if (args) {
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
Thrift.inherits(Exception, Thrift.TException);
Exception.prototype.name = 'Exception';
Exception.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Exception.prototype.write = function(output) {
  output.writeStructBegin('Exception');
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 1);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var InitRequest = module.exports.InitRequest = function(args) {
  this.config_path = null;
  this.model_path = null;
  this.fr_addr = null;
  this.fr_port = null;
  if (args) {
    if (args.config_path !== undefined && args.config_path !== null) {
      this.config_path = args.config_path;
    }
    if (args.model_path !== undefined && args.model_path !== null) {
      this.model_path = args.model_path;
    }
    if (args.fr_addr !== undefined && args.fr_addr !== null) {
      this.fr_addr = args.fr_addr;
    }
    if (args.fr_port !== undefined && args.fr_port !== null) {
      this.fr_port = args.fr_port;
    }
  }
};
InitRequest.prototype = {};
InitRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.config_path = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.model_path = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.fr_addr = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.I32) {
        this.fr_port = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

InitRequest.prototype.write = function(output) {
  output.writeStructBegin('InitRequest');
  if (this.config_path !== null && this.config_path !== undefined) {
    output.writeFieldBegin('config_path', Thrift.Type.STRING, 1);
    output.writeString(this.config_path);
    output.writeFieldEnd();
  }
  if (this.model_path !== null && this.model_path !== undefined) {
    output.writeFieldBegin('model_path', Thrift.Type.STRING, 2);
    output.writeString(this.model_path);
    output.writeFieldEnd();
  }
  if (this.fr_addr !== null && this.fr_addr !== undefined) {
    output.writeFieldBegin('fr_addr', Thrift.Type.STRING, 3);
    output.writeString(this.fr_addr);
    output.writeFieldEnd();
  }
  if (this.fr_port !== null && this.fr_port !== undefined) {
    output.writeFieldBegin('fr_port', Thrift.Type.I32, 4);
    output.writeI32(this.fr_port);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var PredRequest = module.exports.PredRequest = function(args) {
  this.imgs_path = null;
  if (args) {
    if (args.imgs_path !== undefined && args.imgs_path !== null) {
      this.imgs_path = Thrift.copyList(args.imgs_path, [null]);
    }
  }
};
PredRequest.prototype = {};
PredRequest.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        this.imgs_path = [];
        var _rtmp31 = input.readListBegin();
        var _size0 = _rtmp31.size || 0;
        for (var _i2 = 0; _i2 < _size0; ++_i2) {
          var elem3 = null;
          elem3 = input.readString();
          this.imgs_path.push(elem3);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

PredRequest.prototype.write = function(output) {
  output.writeStructBegin('PredRequest');
  if (this.imgs_path !== null && this.imgs_path !== undefined) {
    output.writeFieldBegin('imgs_path', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.STRING, this.imgs_path.length);
    for (var iter4 in this.imgs_path) {
      if (this.imgs_path.hasOwnProperty(iter4)) {
        iter4 = this.imgs_path[iter4];
        output.writeString(iter4);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

