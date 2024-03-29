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


var ttypes = require('./main_types');
//HELPER FUNCTIONS AND STRUCTURES

var MapWorldMain_NotifyProgress_args = function(args) {
  this.req = null;
  if (args) {
    if (args.req !== undefined && args.req !== null) {
      this.req = new ttypes.ProgsReq(args.req);
    }
  }
};
MapWorldMain_NotifyProgress_args.prototype = {};
MapWorldMain_NotifyProgress_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.req = new ttypes.ProgsReq();
        this.req.read(input);
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

MapWorldMain_NotifyProgress_args.prototype.write = function(output) {
  output.writeStructBegin('MapWorldMain_NotifyProgress_args');
  if (this.req !== null && this.req !== undefined) {
    output.writeFieldBegin('req', Thrift.Type.STRUCT, 1);
    this.req.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var MapWorldMain_NotifyProgress_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.Response(args.success);
    }
  }
};
MapWorldMain_NotifyProgress_result.prototype = {};
MapWorldMain_NotifyProgress_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.Response();
        this.success.read(input);
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

MapWorldMain_NotifyProgress_result.prototype.write = function(output) {
  output.writeStructBegin('MapWorldMain_NotifyProgress_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var MapWorldMain_NotifyResult_args = function(args) {
  this.req = null;
  if (args) {
    if (args.req !== undefined && args.req !== null) {
      this.req = new ttypes.ResultReq(args.req);
    }
  }
};
MapWorldMain_NotifyResult_args.prototype = {};
MapWorldMain_NotifyResult_args.prototype.read = function(input) {
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
      if (ftype == Thrift.Type.STRUCT) {
        this.req = new ttypes.ResultReq();
        this.req.read(input);
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

MapWorldMain_NotifyResult_args.prototype.write = function(output) {
  output.writeStructBegin('MapWorldMain_NotifyResult_args');
  if (this.req !== null && this.req !== undefined) {
    output.writeFieldBegin('req', Thrift.Type.STRUCT, 1);
    this.req.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var MapWorldMain_NotifyResult_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.Response(args.success);
    }
  }
};
MapWorldMain_NotifyResult_result.prototype = {};
MapWorldMain_NotifyResult_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true) {
    var ret = input.readFieldBegin();
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid) {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.Response();
        this.success.read(input);
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

MapWorldMain_NotifyResult_result.prototype.write = function(output) {
  output.writeStructBegin('MapWorldMain_NotifyResult_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var MapWorldMainClient = exports.Client = function(output, pClass) {
  this.output = output;
  this.pClass = pClass;
  this._seqid = 0;
  this._reqs = {};
};
MapWorldMainClient.prototype = {};
MapWorldMainClient.prototype.seqid = function() { return this._seqid; };
MapWorldMainClient.prototype.new_seqid = function() { return this._seqid += 1; };

MapWorldMainClient.prototype.NotifyProgress = function(req, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_NotifyProgress(req);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_NotifyProgress(req);
  }
};

MapWorldMainClient.prototype.send_NotifyProgress = function(req) {
  var output = new this.pClass(this.output);
  var params = {
    req: req
  };
  var args = new MapWorldMain_NotifyProgress_args(params);
  try {
    output.writeMessageBegin('NotifyProgress', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

MapWorldMainClient.prototype.recv_NotifyProgress = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new MapWorldMain_NotifyProgress_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('NotifyProgress failed: unknown result');
};

MapWorldMainClient.prototype.NotifyResult = function(req, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_NotifyResult(req);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_NotifyResult(req);
  }
};

MapWorldMainClient.prototype.send_NotifyResult = function(req) {
  var output = new this.pClass(this.output);
  var params = {
    req: req
  };
  var args = new MapWorldMain_NotifyResult_args(params);
  try {
    output.writeMessageBegin('NotifyResult', Thrift.MessageType.CALL, this.seqid());
    args.write(output);
    output.writeMessageEnd();
    return this.output.flush();
  }
  catch (e) {
    delete this._reqs[this.seqid()];
    if (typeof output.reset === 'function') {
      output.reset();
    }
    throw e;
  }
};

MapWorldMainClient.prototype.recv_NotifyResult = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new MapWorldMain_NotifyResult_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('NotifyResult failed: unknown result');
};
var MapWorldMainProcessor = exports.Processor = function(handler) {
  this._handler = handler;
};
MapWorldMainProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
};
MapWorldMainProcessor.prototype.process_NotifyProgress = function(seqid, input, output) {
  var args = new MapWorldMain_NotifyProgress_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.NotifyProgress.length === 1) {
    Q.fcall(this._handler.NotifyProgress.bind(this._handler),
      args.req
    ).then(function(result) {
      var result_obj = new MapWorldMain_NotifyProgress_result({success: result});
      output.writeMessageBegin("NotifyProgress", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
      output.writeMessageBegin("NotifyProgress", Thrift.MessageType.EXCEPTION, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.NotifyProgress(args.req, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new MapWorldMain_NotifyProgress_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("NotifyProgress", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("NotifyProgress", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
MapWorldMainProcessor.prototype.process_NotifyResult = function(seqid, input, output) {
  var args = new MapWorldMain_NotifyResult_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.NotifyResult.length === 1) {
    Q.fcall(this._handler.NotifyResult.bind(this._handler),
      args.req
    ).then(function(result) {
      var result_obj = new MapWorldMain_NotifyResult_result({success: result});
      output.writeMessageBegin("NotifyResult", Thrift.MessageType.REPLY, seqid);
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    }).catch(function (err) {
      var result;
      result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
      output.writeMessageBegin("NotifyResult", Thrift.MessageType.EXCEPTION, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  } else {
    this._handler.NotifyResult(args.req, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new MapWorldMain_NotifyResult_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("NotifyResult", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("NotifyResult", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
