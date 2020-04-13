const thrift = require("thrift");
const assert = require("assert");
const Preditor = require("./gen-thrift/MapWorldService");
const PredTypes = require("./gen-thrift/predict_types");
const { TBufferedTransport: transport, TBinaryProtocol: protocol } = thrift;

function createConnection() {
  const connection = thrift.createConnection("localhost", 77971, {
    transport,
    protocol,
  });

  connection.on("error", function (err) {
    assert(false, err);
  });

  const client = thrift.createClient(Predictor, connection);

  return client;
}

async function initPred(configPath, modelPath, frAddr, frPort) {
  const client = createConnection();

  const initRequest = new PredTypes.InitRequest();
  initRequest.config_path = configPath;
  initRequest.model_path = modelPath;
  initRequest.fr_addr = frAddr;
  initRequest.fr_port = frPort;

  const predictPromise = (initRequest) => {
    return new Promise((resolve, reject) => {
      client.init(initRequest, (err, response) => {
        if (err) return reject(err);
        resolve(response);
      })
    });
  }

  const resp = await predictPromise(initRequest);
  return resp;
}


module.exports = {
  initPred
}
