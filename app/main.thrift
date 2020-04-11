exception Exception {
  1: string message
}

struct ProgsReq {
  1: i32 total
  2: i32 current
  3: string curr_filename
}

struct ResultReq {
  1: string label_path
  2: string json_path
}

service MapWorldMain {
    void NotifyProgress(1: ProgsReq req)
    void NotifyResult(1: ResultReq req)
}
