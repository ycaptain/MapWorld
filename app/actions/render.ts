export const RenderActionNames = {
  ADD_BUILDINGS: 'ADD_BUILDINGS',
  SET_PRED_REQUEST: 'SET_PRED_REQUEST',
  RESET: 'RESET',
} as const;

type AddBuildingsAction = ReturnType<typeof addBuildings>;

type SetPredRequestAction = ReturnType<typeof setPredRequest>;

type ResetAction = ReturnType<typeof reset>;

export interface RawBuilding {
  meta: {
    'origin.x': number,
    'origin.y': number,
    w: number,
    h: number,
    prescale: number,
    img_path: string,
  };
  roadImg: string,
  labelImg: string,
  rawImg: string,
  buildings: Array<{
    coordinates: Array<
      {
        [K in 'x' | 'y' | 'z']: number;
      }
    >;
    properties: {
      height: number;
    };
  }>;
}

export interface PredRequest {
  id: string;
  imgsPath: Array<{
    filePath: string;
    blob: string;
  }>;
  imgsMeta: Array<{
    origin: {
      x: number;
      y: number;
    };
  }>;
  modelName: string;
  gpu: number;
  tmpOptPath?: string;
  prescale?: number;
  batchSize?: number;
  pending: boolean;
  error: any;
}

export type renderActionTypes = AddBuildingsAction | SetPredRequestAction | ResetAction;

export function addBuildings(rawBuildings: Array<RawBuilding>) {
  return {
    type: RenderActionNames.ADD_BUILDINGS,
    payload: rawBuildings,
  };
}

export function setPredRequest(predRequest: PredRequest) {
  return {
    type: RenderActionNames.SET_PRED_REQUEST,
    payload: predRequest,
  };
}

export function reset() {
  return {
    type: RenderActionNames.RESET,
  };
}
