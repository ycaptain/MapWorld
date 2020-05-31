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
  pixelSize: XY;
}

interface PredRequest {
  imgsPath: Array<string>;
  imgsMeta: Array<GeoMeta>;
  modelName: string;
  gpu: number;
  tmpOptPath?: string;
  prescale?: number;
  batchSize?: number;
}

export const IpcChannels = {
  CONNECT_CLIENT: "CONNECT_CLIENT",
  INIT_CLIENT: "INIT_CLIENT",
  DO_PRED: "DO_PRED",
  DESTORY_CLIENT: "DESTORY_CLIENT",
  GET_TASK: "GET_TASK",
} as const;

export type ChannelNameTypes = keyof typeof IpcChannels;

export function connectClient(): void {
  ipcRenderer.send(IpcChannels.CONNECT_CLIENT);
}

export function initClient(initRequest: InitRequest): void {
  ipcRenderer.send(IpcChannels.INIT_CLIENT, initRequest);
}

export function doPred(predRequets: PredRequest): void {
  ipcRenderer.send(IpcChannels.DO_PRED, predRequets);
}

export function destoryClient(): void {
  ipcRenderer.send(IpcChannels.DESTORY_CLIENT);
}

export function getTask(): void {
  ipcRenderer.send(IpcChannels.GET_TASK);
}
