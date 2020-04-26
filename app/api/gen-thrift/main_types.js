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

var ProgsReq = module.exports.ProgsReq = function(args) {
  this.total = null;
  this.current = null;
  this.curr_filename = null;
  if (args) {
    if (args.total !== undefined && args.total !== null) {
      this.total = args.total;
    }
    if (args.current !== undefined && args.current !== null) {
      this.current = args.current;
    }
    if (args.curr_filename !== undefined && args.curr_filename !== null) {
      this.curr_filename = args.curr_filename;
    }
  }
};
ProgsReq.prototype = {};
ProgsReq.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.I32) {
        this.total = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.I32) {
        this.current = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.curr_filename = input.readString();
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

ProgsReq.prototype.write = function(output) {
  output.writeStructBegin('ProgsReq');
  if (this.total !== null && this.total !== undefined) {
    output.writeFieldBegin('total', Thrift.Type.I32, 1);
    output.writeI32(this.total);
    output.writeFieldEnd();
  }
  if (this.current !== null && this.current !== undefined) {
    output.writeFieldBegin('current', Thrift.Type.I32, 2);
    output.writeI32(this.current);
    output.writeFieldEnd();
  }
  if (this.curr_filename !== null && this.curr_filename !== undefined) {
    output.writeFieldBegin('curr_filename', Thrift.Type.STRING, 3);
    output.writeString(this.curr_filename);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var ResultReq = module.exports.ResultReq = function(args) {
  this.label_path = null;
  this.json_path = null;
  if (args) {
    if (args.label_path !== undefined && args.label_path !== null) {
      this.label_path = args.label_path;
    }
    if (args.json_path !== undefined && args.json_path !== null) {
      this.json_path = args.json_path;
    }
  }
};
ResultReq.prototype = {};
ResultReq.prototype.read = function(input) {
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
        this.label_path = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.json_path = input.readString();
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

ResultReq.prototype.write = function(output) {
  output.writeStructBegin('ResultReq');
  if (this.label_path !== null && this.label_path !== undefined) {
    output.writeFieldBegin('label_path', Thrift.Type.STRING, 1);
    output.writeString(this.label_path);
    output.writeFieldEnd();
  }
  if (this.json_path !== null && this.json_path !== undefined) {
    output.writeFieldBegin('json_path', Thrift.Type.STRING, 2);
    output.writeString(this.json_path);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

