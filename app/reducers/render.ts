import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { RenderActionNames, renderActionTypes, RawBuilding, PredRequest } from "@/actions/render";

export type Dispatch = ReduxDispatch<Action<renderStateType>>;

export type Store = ReduxStore<renderStateType, Action<renderActionTypes>>;

export type renderStateType = {
  render: typeof initialState;
};

export type ModalNameTypes = 'Building-Deeplab' | 'Road-UNet' | 'Road-Deeplab' | 'City-CycleGAN';

const initialState = {
  id: '1',
  buildings: [] as Array<RawBuilding>,
  predRequest: {
    imgsPath: [] as Array<{
      filePath: string;
      blob: string;
    }>,
    imgsMeta: [] as Array<{
      origin: {
        x: number;
        y: number;
      };
    }>,
    roadImg: '',
    labelImg: '',
    rawImg: '',
    modelName: 'Building-Deeplab' as ModalNameTypes,
    gpu: 0,
    tmpOptPath: '',
    pending: false,
    error: null as any,
  },
}

export const renderReducer = (state=initialState, action: renderActionTypes) => {
  switch(action.type) {
    case RenderActionNames.ADD_BUILDINGS:
      const nextBuildings = [...state.buildings, ...action.payload];
      console.info(nextBuildings);
      return {
        ...state,
        buildings: nextBuildings
      }
    case RenderActionNames.SET_PRED_REQUEST:
      return {
        ...state,
        predRequest: action.payload,
      }
    default:
      return state;
  }
}
