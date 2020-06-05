import { ipcRenderer } from "electron";

interface InitRequest {
  configPath: string;
  frAddr?: string | undefined;
  frPort?: string | undefined;
}

interface XY {
  x: number;
  y: number;
}

interface GeoMeta {
  origin: XY;
}

interface PredRequest {
  imgsPath: Array<string>;
  imgsMeta: Array<GeoMeta>;
  modelName: string;
  gpu: number;
  tmpOptPath?: string;
  prescale?: number;
  batchSize?: number;
  cycleganType?: 'SatelliteToMap' | 'MapToSatellite'
}

export const IpcChannels = {
  CONNECT_CLIENT: "CONNECT_CLIENT",
  INIT_CLIENT: "INIT_CLIENT",
  DO_PRED: "DO_PRED",
  DESTORY_CLIENT: "DESTORY_CLIENT",
  GET_TASK: "GET_TASK",

  NOTIFY_PROGRESS: 'NOTIFY_PROGRESS',
  NOTIFY_LOAD_CHECKPOINT: 'NOTIFY_LOAD_CHECKPOINT',
  NOTIFY_START_THREAD: 'NOTIFY_START_THREAD',
  NOTIFY_PRED_IMG: 'NOTIFY_PRED_IMG',
  NOTIFY_BATCH_PRED: 'NOTIFY_BATCH_PRED',
  NOTIFY_RESULT: 'NOTIFY_RESULT',
} as const;

export type ChannelNameTypes = keyof typeof IpcChannels;

export function connectClient(): void {
  ipcRenderer.send(IpcChannels.CONNECT_CLIENT);
}

export function initClient(initRequest: InitRequest): void {
  ipcRenderer.send(IpcChannels.INIT_CLIENT, initRequest);
}

export function doPred(predRequets: PredRequest[]): void {
  ipcRenderer.send(IpcChannels.DO_PRED, predRequets);
}

export function destoryClient(): void {
  ipcRenderer.send(IpcChannels.DESTORY_CLIENT);
}

export function getTask(): void {
  ipcRenderer.send(IpcChannels.GET_TASK);
}

export interface ProgressRequest {
  total: number;
  current: number;
  curr_filename: string;
  id: string;
  json_path: string;
}

export interface ResultRequest {
  label_path: string;
  json_path: string;
  current: number;
  total: number;
  id: string;
}

export interface ProdMidRequest {
  count: number;
  total: number;
  id: string;
}
