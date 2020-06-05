namespace py mwfrontend
exception Exception {
  1: string message
}

struct ProgsReq {
  1: i32 total
  2: i32 current
  3: string curr_filename
  4: string id
  5: string json_path
}

struct ResultReq {
  1: string label_path
  2: string json_path
  3: i8 current
  4: i8 total
  5: string id
}

struct Response {
  1: i8 code
  2: optional string msg
}

struct PredMidReq {
  1: i8 count
  2: i8 total
  3: string id
}

service MapWorldMain {
    Response NotifyProgress(1: ProgsReq req)

    Response NotifyPredImg(1: PredMidReq req)
    Response NotifyBatchPred(1: PredMidReq req)
    Response NotifyResult(1: ResultReq req)




}
