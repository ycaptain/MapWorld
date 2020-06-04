import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { RenderActionNames, renderActionTypes, RawBuilding, PredRequest } from "@/actions/render";

export type Dispatch = ReduxDispatch<Action<renderStateType>>;

export type Store = ReduxStore<renderStateType, Action<renderActionTypes>>;

export type renderStateType = {
  render: typeof initialState;
};

const initialState = {
  buildings: [] as Array<RawBuilding>,
  predRequest: null as PredRequest | null,
}

export const renderReducer = (state=initialState, action: renderActionTypes) => {
  switch(action.type) {
    case RenderActionNames.ADD_BUILDINGS:
      return {
        ...state,
        buildings: [...state.buildings, ...action.payload]
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
