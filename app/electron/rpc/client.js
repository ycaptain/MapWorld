const thrift = require("thrift");
const MapWorldService = require("./service/MapWorldService");
const ttypes = require("./service/predict_types");
const { promisify } = require("util");

const transport = thrift.TBufferedTransport;
const protocol = thrift.TBinaryProtocol;

class RpcClient {
  constructor() {
    this.conn = null;
    this.client = null;
  }

  connect(host, port) {
    this.conn = thrift.createConnection(host || "localhost", port || 12345, {
      transport,
      protocol,
    });
    this.client = thrift.createClient(MapWorldService, this.conn);
  }

  disconnect() {
    if (this.conn) {
      this.conn.destroy();
      this.conn = null;
      this.client = null;
    }
  }
}

// promisify
["initialize", "deinit", "doPred", "getTask"].forEach((func) => {
  RpcClient.prototype[func] = function (...args) {
    return new Promise((resolve, reject) => {
      this.client[func](...args, (err, resp) => {
        if (err) {
          reject(err);
        }
        resolve(resp);
      });
    });
  };
});

module.exports = { RpcClient };
